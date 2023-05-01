package es.upm.dit.isst.tucomapi.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Votacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    private LocalDateTime fecha;
    private String idpollsapi;
    private int idcomunidad;
    private int idusuario;
    
    public Votacion() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getIdpollsapi() {
        return idpollsapi;
    }

    public void setIdpollsapi(String idpollsapi) {
        this.idpollsapi = idpollsapi;
    }

    public int getIdcomunidad() {
        return idcomunidad;
    }

    public void setIdcomunidad(int idcomunidad) {
        this.idcomunidad = idcomunidad;
    }

    public int getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(int idusuario) {
        this.idusuario = idusuario;
    }
}
