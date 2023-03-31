package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ComunidadController {

    private final ComunidadRepository comunidadRepository;

    public static final Logger log = LoggerFactory.getLogger(ComunidadController.class);

    public ComunidadController(ComunidadRepository t) {
        this.comunidadRepository = t;
    }

    @GetMapping("/comunidades")
    List<Comunidad> readAll() {
      return (List<Comunidad>) comunidadRepository.findAll();
    }
}
