package es.upm.dit.isst.tucomapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.util.List;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/comunicados")
    List<Comunicado> readAll(Principal principal) {

      Usuario Usuario = usuarioRepository.findByEmail(principal.getName()).orElse(null);
      int idComunidad = 0;

      if (Usuario!=null)
        idComunidad = Usuario.getIdcomunidad();
      return (List<Comunicado>) comunicadoRepository.findAllByIdComunidad(idComunidad);

      /*devolver comunicados */

    }
}
