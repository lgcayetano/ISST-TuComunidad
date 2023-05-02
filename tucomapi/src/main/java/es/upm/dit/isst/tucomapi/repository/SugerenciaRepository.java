package es.upm.dit.isst.tucomapi.repository;

import es.upm.dit.isst.tucomapi.model.Sugerencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface SugerenciaRepository extends CrudRepository<Sugerencia, Integer> {
    @Query(value = "SELECT * FROM Sugerencia WHERE idcomunidad=?1 ORDER BY id DESC", nativeQuery = true)
    Iterable<Sugerencia> findAllByIdComunidad(int idcomunidad);

}