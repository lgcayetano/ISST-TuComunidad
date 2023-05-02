package es.upm.dit.isst.tucomapi.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.tucomapi.model.Votacion;

public interface VotacionRepository extends CrudRepository<Votacion, Integer> {
    @Query(value = "SELECT * FROM Votacion WHERE idcomunidad=?1 ORDER BY id DESC", nativeQuery = true)
    Iterable<Votacion> findAllByIdComunidad(int idcomunidad);
}
