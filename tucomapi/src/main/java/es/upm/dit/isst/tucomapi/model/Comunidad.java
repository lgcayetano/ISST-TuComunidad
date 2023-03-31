package es.upm.dit.isst.tucomapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Comunidad {

    @Id
    private int id;
    private String nombre;

    public Comunidad() {
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
