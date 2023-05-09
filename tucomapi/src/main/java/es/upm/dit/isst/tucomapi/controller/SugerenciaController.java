package es.upm.dit.isst.tucomapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.tucomapi.model.Sugerencia;
import es.upm.dit.isst.tucomapi.repository.SugerenciaRepository;

/*mail */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SugerenciaController {

    /*mail */
    @Autowired
    private JavaMailSender mailSender;

    

    private final SugerenciaRepository sugerenciaRepository;
    private final UsuarioRepository usuarioRepository;

    public static final Logger log = LoggerFactory.getLogger(SugerenciaController.class);

    
    
    public SugerenciaController(SugerenciaRepository t, UsuarioRepository t2) {
      this.sugerenciaRepository = t;
      this.usuarioRepository = t2;
    }

    @GetMapping("/sugerencias") /*muestra las sugerencias  */
    List<Sugerencia> readAll(Principal principal) {
      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
      int idComunidad = 0;

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();

      return (List<Sugerencia>) sugerenciaRepository.findAllByIdComunidad(idComunidad);

    }

    
    
    @PostMapping("/sugerencias/nueva")
      public ResponseEntity<Object> nuevaSugerencia (@RequestParam("mensaje") String mensaje, Principal principal) {
        /*gestion de usuario, obtener comunidad e id de principal */
        Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
        int idComunidad = 0;
        int idUsuario = 0;
        boolean permisosUsuario = false;

        if (usuario!=null){
          idComunidad = usuario.getIdcomunidad();
          idUsuario = usuario.getId();
          permisosUsuario = usuario.isPermisos();
        }
          /*nueva sugerencia */

        if (permisosUsuario) {
          Sugerencia newSugerencia = new Sugerencia();

          newSugerencia.setIdComunidad(idComunidad);
          newSugerencia.setMensaje(mensaje);
          newSugerencia.setFecha(LocalDateTime.now());
          newSugerencia.setIdusuario(idUsuario);
          sugerenciaRepository.save(newSugerencia);

          /*enviar mail */

          Usuario presiComunidad = usuarioRepository.findPresidenteByIdComunidad(idComunidad).orElse(null);

          String emailPresi = presiComunidad.getEmail();

        String sugerenciaNueva = "Ha recibido una nueva sugerencia: \n\n";
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tucomunidad.notificaciones@gmail.com");
        message.setTo("<"+emailPresi+">");
        message.setSubject("TuComunidad-Sugerencia nueva");
        message.setText(sugerenciaNueva+mensaje);
        mailSender.send(message);

        }
        
        return ResponseEntity.ok().body("sugerencia creada correctamente");

      }


}
