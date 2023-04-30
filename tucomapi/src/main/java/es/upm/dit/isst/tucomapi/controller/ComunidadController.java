package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ComunidadController {

  private final ComunidadRepository comunidadRepository;
  private final UsuarioRepository usuarioRepository;

    public static final Logger log = LoggerFactory.getLogger(ComunidadController.class);

    public ComunidadController(ComunidadRepository t, UsuarioRepository t2) {
      this.comunidadRepository = t;
      this.usuarioRepository = t2;
    }

    @GetMapping("/comunidad/id")
    int readId(Principal principal) {

      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();
      
      return idComunidad;
    }

    @GetMapping("/comunidad")
    String readNombre(Principal principal) {

      int idComunidad = 0;
      String nombreComunidad = "";

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();
      
      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      if (Comunidad!=null)
        nombreComunidad = Comunidad.getNombre();

      return nombreComunidad;
    }
    /*muestra el codigo de registro para un presi */
    @GetMapping("/comunidad/codigopresidente")
    String codigoPresidente(Principal principal) {
      

      int idComunidad = 0;
      String codigoPresidente = "";

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();
      
      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      if (Comunidad!=null)
      codigoPresidente = Comunidad.getCodigopresidente();

      if (Usuario.getNivel() == 1){
        return codigoPresidente;
      }

      return "no tienes acceso a este recurso";
      
    }

    /*muestra el codigo de registro para un vecino */
    @GetMapping("/comunidad/codigovecinos")
    String codigoVecino(Principal principal) {

      int idComunidad = 0;
      String codigoVecino = "";

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();
      
      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      if (Comunidad!=null)
      codigoVecino = Comunidad.getCodigovecino();

      return codigoVecino;
    }



    /*edita el codigo de presidente */
    @PostMapping("/comunidad/editcodigopresi")
    public String editCodigoPresi(@RequestParam("codigo") String codigo, Principal principal){

      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      if (Usuario.getNivel()==1){
        Comunidad.setCodigopresidente(codigo);
        comunidadRepository.save(Comunidad);
        return "codigo cambiado correctamente";
      }
      return "no puedes editar esto";
    }

    @PostMapping("/comunidad/editcodigovecino")
    public String editCodigoVecino(@RequestParam("codigo") String codigo, Principal principal){

      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      if (Usuario.getNivel()==1){
        Comunidad.setCodigovecino(codigo);
        comunidadRepository.save(Comunidad);
        return "codigo cambiado correctamente";
      }
      return "no puedes editar esto";
    }

}
