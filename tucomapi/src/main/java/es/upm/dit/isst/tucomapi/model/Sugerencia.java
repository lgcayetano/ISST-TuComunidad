package es.upm.dit.isst.tucomapi.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/*import javax.persistence.ManyToOne;*/
import javax.persistence.Lob;

import java.time.LocalDateTime;

@Entity
public class Sugerencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    private LocalDateTime fecha;
    @Column(length = 10000)
    private String mensaje;
    /*@ManyToOne
    private Usuario idUsuario;*/
    /*@ManyToOne
    private Comunidad idcomunidad;*/
    private int idusuario;
    private int idcomunidad;




    public int getIdusuario() {
        return idusuario;
    }
    public void setIdusuario(int idusuario) {
        this.idusuario = idusuario;
    }
    

    public int getIdcomunidad() {
        return idcomunidad;
    }
    public void setIdcomunidad(int idcomunidad) {
        this.idcomunidad = idcomunidad;
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
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    public int getIdComunidad() {
        return idcomunidad;
    }
    public void setIdComunidad(int idcomunidad) {
        this.idcomunidad = idcomunidad;

    /*public Usuario getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }
    
    public Comunidad getIdComunidad() {
        return idcomunidad;
    }
    public void setIdComunidad(Comunidad idcomunidad) {
        this.idcomunidad = idcomunidad;
    }*/
    }
}