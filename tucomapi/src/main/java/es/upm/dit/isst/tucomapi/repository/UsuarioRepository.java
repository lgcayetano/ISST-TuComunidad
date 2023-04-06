package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    
}