package es.upm.dit.isst.tucomweb.model;

import javax.validation.constraints.NotEmpty;

public class Comunidad {

    @NotEmpty
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
