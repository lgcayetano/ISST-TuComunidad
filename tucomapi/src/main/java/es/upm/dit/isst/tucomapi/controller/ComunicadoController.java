package es.upm.dit.isst.tucomapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;


import es.upm.dit.isst.tucomapi.model.Comunicado;
import es.upm.dit.isst.tucomapi.repository.ComunicadoRepository;

public class ComunicadoController {

    private final ComunicadoRepository comunicadoRepository;

    public static final Logger log = LoggerFactory.getLogger(ComunicadoController.class);

    public ComunicadoController(ComunicadoRepository t) {
        this.comunicadoRepository = t;
    }

    @GetMapping("/comunicados")
    List<Comunicado> readAll() {
      return (List<Comunicado>) comunicadoRepository.findAll();
    }
}
