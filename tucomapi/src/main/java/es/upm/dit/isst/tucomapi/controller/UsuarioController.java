package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    public UsuarioController(UsuarioRepository t) {
        this.usuarioRepository = t;
    }

    @GetMapping("/usuario")
    String readNombre(Principal principal) {

      String nombreUsuario = "";

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null)
        nombreUsuario = Usuario.getNombre();

      return nombreUsuario;
    }

    @PostMapping("/registro")
    //................................................


    //Métodos no útiles, utilizados para pruebas:

    @GetMapping("/usuarios")
    List<Usuario> readAll() {
      return (List<Usuario>) usuarioRepository.findAll();
    }

    @GetMapping("/idusuario")
    int idUsuario(@RequestParam("email") String email, @RequestParam("contrasena") String contrasena){

      int Id = 0;

      Usuario Usuario = usuarioRepository.findByEmailContrasena(email,contrasena).orElse(null);
      
      if (Usuario!=null)
        Id = Usuario.getId();

      return Id;
    }

    @GetMapping("/principal")
    String principal(Principal principal, Authentication authentication) {

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      String texto = "";
      texto += "id: " + Usuario.getId();
      texto += "<br>nombre: " + Usuario.getNombre();
      texto += "<br>email: " + Usuario.getEmail();
      texto += "<br>contrasena: " + Usuario.getContrasena();
      texto += "<br>nivel: " + Usuario.getNivel();
      texto += "<br>estado: " + Usuario.isEstado();
      texto += "<br>idcomunidad: " + Usuario.getIdcomunidad();
      texto += "<br>permisos: " + Usuario.isPermisos();

      return texto + "<br><br>" + authentication.toString();
    }
}
