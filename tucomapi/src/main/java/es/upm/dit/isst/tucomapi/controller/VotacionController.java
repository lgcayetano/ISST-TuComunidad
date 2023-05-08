package es.upm.dit.isst.tucomapi.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.model.UsuarioDTO;
import es.upm.dit.isst.tucomapi.model.Votacion;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;
import es.upm.dit.isst.tucomapi.repository.VotacionRepository;

@CrossOrigin
@RestController
public class VotacionController {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${pollsApiKey}")
    private String pollsApiKey;
    
    private final VotacionRepository votacionRepository;
    private final UsuarioRepository usuarioRepository;
    
    public static final Logger log = LoggerFactory.getLogger(VotacionController.class);

    public VotacionController(VotacionRepository t, UsuarioRepository t2) {
        this.votacionRepository = t;
        this.usuarioRepository = t2;
    }

    @GetMapping("/votacion/apikey")
    String readApiKey() {
        return pollsApiKey;
    }

    @GetMapping("/votaciones") /*muestra los comunicados  */
    List<Votacion> readAll(Principal principal) {

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
      int idComunidad = 0;

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();

      return (List<Votacion>) votacionRepository.findAllByIdComunidad(idComunidad);

    }

    @PostMapping("/votacion/nueva")
    ResponseEntity<Object> nuevaVotacion(@RequestParam("idpollsapi") String idpollsapi, Principal principal) {

        Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
        int idComunidad = 0;
        int idUsuario = 0;

        if (usuario!=null){
            idComunidad = usuario.getIdcomunidad();
            idUsuario = usuario.getId();

            Votacion newVotacion = new Votacion();

            newVotacion.setFecha(LocalDateTime.now());
            newVotacion.setIdpollsapi(idpollsapi);
            newVotacion.setIdcomunidad(idComunidad);
            newVotacion.setIdusuario(idUsuario);

            votacionRepository.save(newVotacion);

            /*enviar mail */

            List<UsuarioDTO> listaUsuarios = usuarioRepository.findAllByIdComunidad(idComunidad);

            String votacionNuevo = "Se ha publicado una votación nueva: \n\n Acceda a https://localhost:8080 para verlo ";

            for(UsuarioDTO cadausuario : listaUsuarios){
                String email = cadausuario.getEmail();
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("tucomunidademail@gmail.com");
                message.setTo("<"+email+">");
                message.setSubject("TuComunidad-Votacion nueva");
                message.setText(votacionNuevo);
                mailSender.send(message);
            }


            return ResponseEntity.ok().body("Votacion creada correctamente");
        }

        return ResponseEntity.badRequest().body("Ha ocurrido un error");  
    }
    
}
