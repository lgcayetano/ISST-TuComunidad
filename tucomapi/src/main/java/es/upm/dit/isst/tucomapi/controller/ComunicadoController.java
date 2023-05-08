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

import es.upm.dit.isst.tucomapi.model.Comunicado;
import es.upm.dit.isst.tucomapi.repository.ComunicadoRepository;

@CrossOrigin
@RestController
public class ComunicadoController {

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

        Usuario vecinoComunidad = usuarioRepository.findVecinoByIdComunidad(idComunidad).orElse(null);

        String emailVecino = vecinoComunidad.getEmail();

      String comunicadoNuevo = "Ha recibido un comunicado nuevo: \n";
      
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom("tucomunidademail@gmail.com");
      message.setTo("<"+emailVecino+">");
      message.setSubject("TuComunidad-Comunicado nuevo");
      message.setText(comunicadoNuevo+mensaje);
      mailSender.send(message);
  
        return ResponseEntity.ok().body("comunicado creado correctamente");

      }
      
}
