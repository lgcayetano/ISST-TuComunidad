package es.upm.dit.isst.tucomapi.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.repository.UsuarioRepository;


@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public Authentication authenticate(Authentication authentication)
      throws AuthenticationException {

        String name = authentication.getPrincipal().toString(); //getName();
        String pass = authentication.getCredentials().toString();

        Usuario Usuario = usuarioRepository.findByEmailContrasena(name,pass).orElse(null);
      
        if (Usuario!=null && Usuario.isEstado()) {

            int nivel = Usuario.getNivel();
            String role = "ROLE_VECI";

            if (nivel==1) role = "ROLE_PRESI";

            List<SimpleGrantedAuthority> ga = new ArrayList<SimpleGrantedAuthority>();
            ga.add(new SimpleGrantedAuthority(role));
            return new UsernamePasswordAuthenticationToken(name, "", ga);
        }
        throw new UsernameNotFoundException ("could not login");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}