package es.upm.dit.isst.tucomapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Usuario {
    
    @Id
    private int id;
    private String nombre;
    private String email;
    private String contrasena;
    private int nivel;
    private boolean estado;
    private int idcomunidad;
    private boolean permisos;

    public Usuario() {
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
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
    public int getNivel() {
        return nivel;
    }
    public void setNivel(int nivel) {
        this.nivel = nivel;
    }
    
    public boolean isEstado() {
        return estado;
    }
    public void setEstado(boolean estado) {
        this.estado = estado;
    }
    
    public int getIdcomunidad() {
        return idcomunidad;
    }

    public void setIdcomunidad(int idcomunidad) {
        this.idcomunidad = idcomunidad;
    }

    public boolean isPermisos() {
        return permisos;
    }
    public void setPermisos(boolean permisos) {
        this.permisos = permisos;
    }

}
