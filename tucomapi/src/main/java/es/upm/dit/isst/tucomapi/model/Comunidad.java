package es.upm.dit.isst.tucomapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Comunidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    private String nombre;
    private String codigopresidente;
    private String codigovecino;
    private boolean estado;

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

    public String getCodigopresidente() {
        return codigopresidente;
    }

    public void setCodigopresidente(String codigopresidente) {
        this.codigopresidente = codigopresidente;
    }

    public String getCodigovecino() {
        return codigovecino;
    }

    public void setCodigovecino(String codigovecino) {
        this.codigovecino = codigovecino;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}
