package es.upm.dit.isst.tucomapi.model;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
public class Comunicado {

    @Id
    private int id;
    private String titulo;
    private LocalDateTime fecha;
    private String mensaje;
    /*@ManyToOne
    private Usuario idUsuario;*/
    @ManyToOne
    private Comunidad idComunidad;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    /*public Usuario getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }*/
    
    public Comunidad getIdComunidad() {
        return idComunidad;
    }
    public void setIdComunidad(Comunidad idComunidad) {
        this.idComunidad = idComunidad;
    }

}