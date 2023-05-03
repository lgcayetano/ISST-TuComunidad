package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.model.UsuarioDTO;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @GetMapping("/usuarios") /*muestra los usuarios de la comunidad  */
    List<UsuarioDTO> readAll(Principal principal) {

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
      int idComunidad = 0;

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();

      return (List<UsuarioDTO>) usuarioRepository.findAllByIdComunidad(idComunidad);

    }

    @GetMapping("/usuario/id")
    int readId(Principal principal) {

      int idUsuario = 0;

      Usuario usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (usuario!=null)
        idUsuario = usuario.getId();

      return idUsuario;
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

      String regexEmail = "^[\\w!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&amp;'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
      Pattern patternEmail = Pattern.compile(regexEmail);
      Matcher matcherEmail = patternEmail.matcher(email);

      if (!matcherEmail.matches()) return "error_email|El email indicado no es válido.";

      String regexPsw = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
      Pattern patternPsw = Pattern.compile(regexPsw);
      Matcher matcherPsw = patternPsw.matcher(contrasena);

      if (!matcherPsw.matches()) return "error_contrasena|La contraseña debe contener mínimo 8 caracteres, una minúscula, una mayúscula y un número.";
      
      Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);

      if (usuario!=null) return "error_email|El email indicado ya está registrado en la plataforma.";

      Comunidad comunidad = comunidadRepository.findByCodigo(codigoregistro).orElse(null);

      if (comunidad==null) return "error_codigo|Código de registro no válido.";

      int nivel = 0;

      String codigopresidente = comunidad.getCodigopresidente();
      String codigovecino = comunidad.getCodigovecino();

      if (codigoregistro.equals(codigopresidente)) nivel = 1;
      else if (codigoregistro.equals(codigovecino)) nivel = 2;

      int idComunidad = comunidad.getId();

      if (nivel==1) {
        Usuario presiComunidad = usuarioRepository.findPresidenteByIdComunidad(idComunidad).orElse(null);
        if (presiComunidad!=null) return "error_codigo|Código de registro no válido.";
      }

      PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      
      Usuario newUsuario = new Usuario();

      newUsuario.setNombre(nombre);
      newUsuario.setEmail(email);
      newUsuario.setContrasena(passwordEncoder.encode(contrasena));
      newUsuario.setNivel(nivel);
      newUsuario.setEstado(true);
      newUsuario.setPermisos(true);
      newUsuario.setIdcomunidad(idComunidad);

      usuarioRepository.save(newUsuario);

      return "OK|¡Registrado correctamente!";
    }

}
