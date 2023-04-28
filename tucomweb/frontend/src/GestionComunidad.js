import './Comunicados.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Header from './Header';
import "./GestionComunidad.css";
export default function GestionComunidad () {

    const [state, setState] = useState({
        usuarios: [],
        nombre: '', 
        codigo: ''
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        });
    }




    return(
        <div>
            <Header />
            
            <div className="comunicados" style={{marginBottom:"20px"}}>

                <Form /*onSubmit={handleSubmit}*/>
                    <FormGroup className="cambioNombre">
                        <span style={{display:"inline"}}><Input className="innnput" type="text" placeholder={state.nombre}
                             value={state.nombre}  onChange={handleChange}  />
                       
                        <Button className='buton' type="submit" >Cambiar nombre comunidad</Button>
                        </span>
                        
                    </FormGroup>

                    <FormGroup className="cambioNombre">
                        <Input className="innnput" type="text" placeholder={state.comunidad}
                             value={state.comunidad}  onChange={handleChange}/>
                        <Button className='buton' type="submit">Cambiar código comunidad</Button>
                    </FormGroup> 
                </Form>
            </div>

            <div className="comunicados" >
                <h3 style={{color:"rgb(164, 40, 40)"}}>LISTA DE USUARIOS</h3>
                    {/*
                    la parte de abajo se elimina en cuanto esté lo de state.usuarios y eso
                    */}

                    
                    <div >
                        <div style={{float:"left", marginRight:"20px", width:"20%"}}>
                            <b>nombre y apellidos</b> 
                            <p>email@email.com</p> 
                        </div>
                        <Button className="buton"> Ceder presidencia </Button>
                        <Button className='buton'> Quitar/dar permisos </Button>
                        <Button className='buton'> X </Button>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <div style={{float:"left", marginRight:"20px", width:"20%"}}>
                            <b>nombre y apellidos Muchos</b> 
                            <p>email@email.com</p> 
                        </div>
                        <Button className="buton"> Ceder presidencia </Button>
                        <Button className='buton'> Quitar/dar permisos </Button>
                        <Button className='buton'> X </Button>
                    </div>
                    

                {
                    state.usuarios && state.usuarios.map(usuario => (
                        <div key={usuario.id} style={{marginTop:"20px"}}>
                            <div style={{float:"left", marginRight:"20px", width:"20%"}}>
                                <b>{usuario.nombre}</b> 
                                <p>{usuario.email}</p> 
                            </div>
                           <Button className="buton"> Ceder presidencia </Button>
                           <Button className="buton"> Quitar/dar permisos </Button>
                           <Button className="buton"> X </Button>

                       </div>
                   ))
               }
               </div>

            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}

