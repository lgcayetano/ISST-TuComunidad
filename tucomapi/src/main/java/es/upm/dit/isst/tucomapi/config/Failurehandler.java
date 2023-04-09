package es.upm.dit.isst.tucomapi.config;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class Failurehandler implements AuthenticationFailureHandler  {

     public void onAuthenticationFailure(HttpServletRequest request,   HttpServletResponse response, AuthenticationException exception) throws IOException  {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }
}