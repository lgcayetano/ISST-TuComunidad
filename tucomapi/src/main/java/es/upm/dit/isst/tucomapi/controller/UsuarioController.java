package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;
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
    private final ComunidadRepository comunidadRepository;

    public static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    public UsuarioController(UsuarioRepository t, ComunidadRepository t2) {
        this.usuarioRepository = t;
        this.comunidadRepository = t2;
    }

    @GetMapping("/auth")
    String checkAuth() {
      return "OK";
    }

    @GetMapping("/usuario")
    String readNombre(Principal principal) {

      String nombreUsuario = "";

      Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (usuario!=null)
        nombreUsuario = usuario.getNombre();

      return nombreUsuario;
    }

    @GetMapping("/usuario/nivel")
    int readNivel(Principal principal) {

      int nivelUsuario = 0;

      Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (usuario!=null)
        nivelUsuario = usuario.getNivel();

      return nivelUsuario;
    }

    @PostMapping("/registro")
    String registerUsuario(@RequestParam("nombre") String nombre, @RequestParam("email") String email, 
                        @RequestParam("contrasena") String contrasena, @RequestParam("codigoregistro") String codigoregistro) {

      String vacioTxt = "Campo vacío. Por favor, indique un valor";
      
      if (nombre.isEmpty()) return "error_nombre|" + vacioTxt;
      if (email.isEmpty()) return "error_email|" + vacioTxt;
      if (contrasena.isEmpty()) return "error_contrasena|" + vacioTxt;
      if (codigoregistro.isEmpty()) return "error_codigo|" + vacioTxt;

      String resultado = "error_email|El email indicado ya está registrado en la plataforma.";

      Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);

      if (usuario==null) {

        resultado = "error_codigo|Código de registro no válido.";

        Comunidad comunidad = comunidadRepository.findByCodigo(codigoregistro).orElse(null);
        
        if (comunidad!=null) {
          
          int nivel = 0;

          String codigopresidente = comunidad.getCodigopresidente();
          String codigovecino = comunidad.getCodigovecino();

          if (codigoregistro.equals(codigopresidente)) nivel = 1;
          else if (codigoregistro.equals(codigovecino)) nivel = 2;
          
          Usuario newUsuario = new Usuario();

          newUsuario.setNombre(nombre);
          newUsuario.setEmail(email);
          newUsuario.setContrasena(contrasena);
          newUsuario.setNivel(nivel);
          newUsuario.setEstado(true);
          newUsuario.setPermisos(true);
          newUsuario.setIdcomunidad(comunidad.getId());

          usuarioRepository.save(newUsuario);

          return "OK|¡Registrado correctamente!";
        }
      }

      return resultado;
    }


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
