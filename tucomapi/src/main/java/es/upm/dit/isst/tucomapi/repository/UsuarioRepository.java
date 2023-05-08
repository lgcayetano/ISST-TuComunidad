package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Usuario;
import es.upm.dit.isst.tucomapi.model.UsuarioDTO;

import java.util.Optional;
import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    @Query(value = "SELECT * FROM Usuario WHERE email=?1", nativeQuery = true)
    Optional<Usuario> findByEmail(String email);

    @Query(value = "SELECT usuario.id AS id, usuario.nombre AS nombre, usuario.email AS email, usuario.permisos AS permisos FROM Usuario WHERE idcomunidad=?1 AND estado=1 ORDER BY id DESC", nativeQuery = true)
    /*Iterable<Usuario> findAllUsersByIdComunidad(int idcomunidad);*/
    List<UsuarioDTO> findAllByIdComunidad(int idcomunidad);

    @Query(value = "SELECT usuario.id AS id, usuario.nombre AS nombre, usuario.email AS email, usuario.permisos AS permisos FROM Usuario WHERE idcomunidad=?1 AND estado=1 AND nivel=2 ORDER BY id DESC", nativeQuery = true)
    List<UsuarioDTO> findVecinosByIdComunidad(int idcomunidad);

    @Query(value = "SELECT * FROM Usuario WHERE idcomunidad=?1 AND nivel=1", nativeQuery = true)
    Optional<Usuario> findPresidenteByIdComunidad(int idcomunidad);

    @Query(value = "SELECT * FROM Usuario WHERE id=?1 AND idcomunidad=?2", nativeQuery = true)
    Optional<Usuario> findByIdAndComunidad(int id, int idcomunidad);

    @Query(value = "SELECT  * FROM Usuario WHERE idcomunidad=?1 AND estado=1 ORDER BY id DESC", nativeQuery = true)
    List<Usuario> findAllByIdComunidadMail(int idcomunidad);
    
    
}