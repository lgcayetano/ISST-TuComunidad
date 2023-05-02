package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.model.UsuarioDTO;

import java.util.Optional;
import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    @Query(value = "SELECT * FROM Usuario WHERE email=?1 AND BINARY contrasena=?2", nativeQuery = true)
    Optional<Usuario> findByEmailContrasena(String email, String contrasena);

    @Query(value = "SELECT * FROM Usuario WHERE email=?1", nativeQuery = true)
    Optional<Usuario> findByEmail(String email);

    @Query(value = "SELECT usuario.id AS id, usuario.nombre AS nombre, usuario.email AS email FROM Usuario WHERE idcomunidad=?1 ORDER BY id DESC", nativeQuery = true)
    /*Iterable<Usuario> findAllUsersByIdComunidad(int idcomunidad);*/
    List<UsuarioDTO> findAllByIdComunidad(int idcomunidad);
    
}