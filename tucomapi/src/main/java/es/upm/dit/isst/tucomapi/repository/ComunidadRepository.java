package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Comunidad;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ComunidadRepository extends CrudRepository<Comunidad, Integer> {
    
    @Query(value = "SELECT * FROM Comunidad WHERE codigopresidente=?1 OR codigovecino=?1", nativeQuery = true)
    Optional<Comunidad> findByCodigo(String codigoregistro);
}