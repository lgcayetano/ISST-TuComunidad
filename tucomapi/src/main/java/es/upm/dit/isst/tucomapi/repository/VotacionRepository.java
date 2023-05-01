package es.upm.dit.isst.tucomapi.repository;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.tucomapi.model.Votacion;

public interface VotacionRepository extends CrudRepository<Votacion, Integer> {
    
}
