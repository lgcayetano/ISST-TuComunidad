package es.upm.dit.isst.tucomapi.controller;

import es.upm.dit.isst.tucomapi.model.Comunidad;
import es.upm.dit.isst.tucomapi.repository.ComunidadRepository;

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

    public static final Logger log = LoggerFactory.getLogger(ComunidadController.class);

    public ComunidadController(ComunidadRepository t) {
        this.comunidadRepository = t;
    }

    @GetMapping("/comunidades")
    List<Comunidad> readAll(Principal principal) {

      List<Comunidad> ListaComunidades = new ArrayList<>();

      if (principal == null || principal.getName().equals(""))
        ListaComunidades = ListaComunidades;
      else
        ListaComunidades = (List<Comunidad>) comunidadRepository.findAll();

      return ListaComunidades;
    }

}
