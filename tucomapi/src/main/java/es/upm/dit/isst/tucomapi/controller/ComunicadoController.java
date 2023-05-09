package es.upm.dit.isst.tucomapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.model.UsuarioDTO;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*mail */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.tucomapi.model.Comunicado;
import es.upm.dit.isst.tucomapi.repository.ComunicadoRepository;

@CrossOrigin
@RestController
public class ComunicadoController {

    @Autowired
    private JavaMailSender mailSender;


    private final ComunicadoRepository comunicadoRepository;
    private final UsuarioRepository usuarioRepository;

    public static final Logger log = LoggerFactory.getLogger(ComunicadoController.class);

    
    
    public ComunicadoController(ComunicadoRepository t, UsuarioRepository t2) {
      this.comunicadoRepository = t;
      this.usuarioRepository = t2;
    }

    @GetMapping("/comunicados") /*muestra los comunicados  */
    List<Comunicado> readAll(Principal principal) {

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
      int idComunidad = 0;

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();

      return (List<Comunicado>) comunicadoRepository.findAllByIdComunidad(idComunidad);

    }

    
    
    @PostMapping("/comunicados/nuevo")
      public ResponseEntity<Object> nuevoComunicado(@RequestParam("titulo") String titulo, @RequestParam("mensaje") String mensaje, Principal principal) {
        /*gestion de usuario, obtener comunidad e id de principal */
        Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
        int idComunidad = 0;
        int idUsuario = 0;
        

        if (usuario!=null){
          idComunidad = usuario.getIdcomunidad();
          idUsuario = usuario.getId();
        }

          /*nuevo comunicado */
        Comunicado newComunicado = new Comunicado();

        newComunicado.setIdComunidad(idComunidad);
        newComunicado.setTitulo(titulo);
        newComunicado.setMensaje(mensaje);
        newComunicado.setFecha(LocalDateTime.now());
        newComunicado.setIdusuario(idUsuario);
        comunicadoRepository.save(newComunicado);

        /*enviar mail */




      List<Usuario> listaUsuarios = usuarioRepository.findAllByIdComunidadMail(idComunidad);

      String comunicadoNuevo = titulo + "\n\n"+ mensaje +"\n\n Acceda a https://localhost:8080/comunicados para verlo ";
      

      for(Usuario cadausuario : listaUsuarios){
        String email = cadausuario.getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tucomunidad.notificaciones@gmail.com");
        message.setTo("<"+email+">");
        message.setSubject("TuComunidad-Comunicado nuevo - "+ titulo);
        message.setText(comunicadoNuevo);
        mailSender.send(message);
        
      }

      
      
      
  
        return ResponseEntity.ok().body("comunicado creado correctamente");

      }
      
}
