package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    public UsuarioController(UsuarioRepository t) {
        this.usuarioRepository = t;
    }

    @GetMapping("/usuarios")
    List<Usuario> readAll() {
      return (List<Usuario>) usuarioRepository.findAll();
    }
}
