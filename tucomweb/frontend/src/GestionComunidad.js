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
            
            <div className="comunicados" >

                <Form /*onSubmit={handleSubmit}*/>
                    <FormGroup className="cambioNombre">
                        <span style={{display:"inline"}}><Input className="innnput" type="text" placeholder={state.nombre}
                             value={state.nombre}  onChange={handleChange}/>
                       
                        <Button type="submit" >Cambiar nombre comunidad</Button>
                        </span>
                        
                    </FormGroup>

                    <FormGroup className="cambioNombre">
                        <Input className="innnput" type="text" placeholder={state.comunidad}
                             value={state.comunidad}  onChange={handleChange}/>
                        <Button type="submit">Cambiar código comunidad</Button>
                    </FormGroup> 
                </Form>

                <div className="comunicados" >
                    
                     <div>
                            <b>nombre y apellidos</b> 
                            <p>email@email.com</p> 
                            <Button> Ceder presidencia </Button>
                            <Button> Quitar/dar permisos </Button>
                            <Button> X </Button>
                    </div>
                    

                {
                    state.usuarios && state.usuarios.map(usuario => (
                        <div key={usuario.id} >
                            <b>{usuario.nombre}</b> 
                            <p>{usuario.email}</p> 
                            <Button> Ceder presidencia </Button>
                            <Button> Quitar/dar permisos </Button>
                            <Button> X </Button>

                        </div>
                    ))
                }
                </div>

                




                



            </div>

            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}

