package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

      
     return codigoPresidente;
    

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



    /*edita el codigo de presidente 
    @PutMapping("/comunidad/editcodigopresi")
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
    }*/

    @PutMapping("/comunidad/editcodigovecino")
    public String editCodigoVecino(Principal principal){

      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      /*generar codigo aleatorio */

      String codigo = RandomStringUtils.randomAlphanumeric(10); /*se pone longitud del codigo */

      
      Comunidad.setCodigovecino(codigo);
      comunidadRepository.save(Comunidad);
      
      return codigo;
      
    }

    @PutMapping("/comunidad/editnombre")
    public String editNombre(@RequestParam("nombre") String nombre, Principal principal){

      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Comunidad Comunidad = comunidadRepository.findById(idComunidad).orElse(null);

      
      Comunidad.setNombre(nombre);;
      comunidadRepository.save(Comunidad);
      return "nombre cambiado correctamente";
      
    }

    @PutMapping("/comunidad/cederpresidencia")
    public String cederPresidencia(@RequestParam("id") int id, Principal principal){


      int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Usuario antiguoPresi = usuarioRepository.findPresidenteByIdComunidad(idComunidad).orElse(null);
      Usuario nuevoPresi = usuarioRepository.findByIdAndComunidad(id, idComunidad).orElse(null);

      nuevoPresi.setNivel(1);
      nuevoPresi.setPermisos(true);
      antiguoPresi.setNivel(2);

      usuarioRepository.save(nuevoPresi);
      usuarioRepository.save(antiguoPresi);


      return "has dejado de ser el presidente";
    }


    @PutMapping("/comunidad/editarpermisos")
    public String editarPermisos(@RequestParam("id") int id, Principal principal){
    int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Usuario vecinoPermisoEditado = usuarioRepository.findByIdAndComunidad(id, idComunidad).orElse(null);

      if(vecinoPermisoEditado.isPermisos() == true){
        vecinoPermisoEditado.setPermisos(false);
      }
      else vecinoPermisoEditado.setPermisos(true);

      usuarioRepository.save(vecinoPermisoEditado);


      return "permisos editados";

    }

    @PutMapping("/comunidad/editarestado")
    public String editarEstado(@RequestParam("id") int id, Principal principal){
    int idComunidad = 0;

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);

      if (Usuario!=null){
        idComunidad = Usuario.getIdcomunidad();
      }

      Usuario vecinoEstadoEditado = usuarioRepository.findByIdAndComunidad(id, idComunidad).orElse(null);

      
      vecinoEstadoEditado.setEstado(false);
      
      
      usuarioRepository.save(vecinoEstadoEditado);


      return "estado editado";

    }
}
