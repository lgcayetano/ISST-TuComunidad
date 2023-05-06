package es.upm.dit.isst.tucomweb.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

//Controlador para poder cargar/refrescar páginas (a parte de la "Home") sin que salga White Label Error,
//es decir, para poder cargar https://localhost:8080/xxxx sin errores
@CrossOrigin
@RestController
public class IndexController implements ErrorController {
    
    private static final String PATH = "/error";
    
    @RequestMapping(value = PATH)
    public ModelAndView saveLeadQuery() {           
        return new ModelAndView("forward:/");
    }

    public String getErrorPath() {
        return PATH;
    }
}