package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Comunicado;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ComunicadoRepository extends CrudRepository<Comunicado, Integer> {
    @Query(value = "SELECT * FROM Comunicado WHERE idcomunidad=?1 ORDER BY id DESC", nativeQuery = true)
    Iterable<Comunicado> findAllByIdComunidad(int idcomunidad);
}