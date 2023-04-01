package es.upm.dit.isst.tucomweb.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import es.upm.dit.isst.tucomweb.model.Comunidad;

@Controller
public class ComunidadController {

    public final String COMMANAGER_STRING= "http://localhost:8083/comunidades/";

    public static final String VISTA_LISTA = "lista";

    private RestTemplate restTemplate = new RestTemplate();
    
    /*
    @GetMapping("/")
    public String inicio() {
        return "redirect:/" + VISTA_LISTA;
    }

    @GetMapping("/lista")
    public String lista(Model model, Principal principal) {

        List<Comunidad> lista = new ArrayList<Comunidad>();

        lista = Arrays.asList(restTemplate.getForEntity(COMMANAGER_STRING,Comunidad[].class).getBody());
            
        model.addAttribute("comunidades", lista);

        return VISTA_LISTA;
    }
    */
}
