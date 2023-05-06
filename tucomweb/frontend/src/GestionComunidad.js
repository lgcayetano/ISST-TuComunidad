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
        codigopresidente: '',
        codigovecinos: '',
        invalid_name:false,
        invalid_neicode:false,
        modificado: false
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let nombrevacio = state.invalid_name;
        if (name=='nombre') nombrevacio = false;

        setState({
            [name]: value,
            invalid_name: nombrevacio,
            usuarios: state.usuarios,
            codigopresidente: state.codigopresidente,
            codigovecinos: state.codigovecinos,
            invalid_neicode: state.invalid_neicode,
            modificado: state.modificado
        });
    }

    

    async function handleSubmit1(event) {
        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();
        if (event.target.elements.nombre.value=='' )
        {
            let nombrevacio = false;
            if (event.target.elements.nombre.value=='') nombrevacio = true;
            setState({
                invalid_name: nombrevacio
            });
        } else {
            const codigos = new FormData();
            codigos.append('nombre', event.target.elements.nombre.value);
            await fetch(apiURL + '/comunidad/editnombre', {
                method: 'PUT',
                credentials: 'include',
                body: codigos
            }).then((response) => {
                if (response.status===200) {
                    setState({
                        modificado:true
                    });
                }
            });
        }
    }

    async function handleSubmit2(event) {
        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();
        const codigos = new FormData();
        await fetch(apiURL + '/comunidad/editcodigovecino', {
            method: 'PUT',
            credentials: 'include',
            body: codigos
        }).then((response) => {
            if (response.status===200) {
                setState({
                    modificado:true
                });
            }
        });
    }

    
    async function handleSubmit3(event) {
        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();
        
        const usuarios = new FormData();
        usuarios.append('id', event.target.elements.id);
        const buttonType=window.event.submitter.name;
        if(buttonType=="cederpresidencia"){
            await fetch(apiURL + '/comunidad/cederpresidencia', {
                method: 'PUT',
                credentials: 'include',
                body: usuarios
            }).then((response) => {
                if (response.status===200) {
                    setState({
                        modificado:true
                    });
                }
            }); 
        }

        if(buttonType=="cambiarpermisos"){
            await fetch(apiURL + '/comunidad/editarpermisos', {
                method: 'PUT',
                credentials: 'include',
                body: usuarios
            }).then((response) => {
                if (response.status===200) {
                    setState({
                        modificado:true
                    });
                }
            });
        }
    }
    
    useEffect(() => {
        let promises = [];
        promises.push(fetch(apiURL + '/comunidad', {
            credentials: 'include'
        })
        .then(response => response.text()));
        promises.push(fetch(apiURL + '/comunidad/codigovecinos', {
            credentials: 'include'
        })
        .then(response => response.text()));
        promises.push(fetch(apiURL + '/usuarios', {
            credentials: 'include'
        })
        .then(response => response.json()));
        promises.push(fetch(apiURL + '/comunidad/codigopresidente', {
            credentials: 'include'
        })
        .then(response => response.text()));
        Promise.all(promises)
        .then(data => {
            setState({
                nombre: data[0],
                codigovecinos: data[1],
                usuarios: data[2],
                codigopresidente: data[3]
            })
        });

    }, []);

    
    if (state.modificado) {
        return (
            <Redirect to='/' />
        )
    } else {
        return(
            <div>
                <Header />
                
                <div className="comunicados" style={{marginBottom:"20px"}}>
    
                    <Form onSubmit={handleSubmit1}>
                        <FormGroup className="cambioNombre">
                            <p><b>Nombre de la comunidad</b></p>
                            <Input className="innnput" name="nombre" type="text" placeholder={state.nombre} id="nombre"
                                 value={state.nombre} invalid={state.invalid_name} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button className='buton' type="submit" >Cambiar nombre de la comunidad</Button>
                        </FormGroup>
                    </Form>

                    <Form onSubmit={handleSubmit2}>
                        <FormGroup className="cambioNombre">
                            <p><b>Código de los vecinos</b></p>
                            <Label for="codigovecinos" className='codes' name="codigovecinos" id="codigovecinos"> {state.codigovecinos} </Label>
                        </FormGroup>
                        <FormGroup>
                            <Button className='buton' type="submit">Cambiar código de los vecinos</Button>
                        </FormGroup> 
                    </Form>
                    <div className="cambioNombre" style={{marginBottom:"50px"}}>
                        <p><b>Código del presidente</b></p>
                        <p className='codes' name="codigopresidente"> {state.codigopresidente} </p>
                    </div> 
                </div>
    
                <div className="comunicados" >
                    <h3 style={{color:"rgb(164, 40, 40)"}}>LISTA DE USUARIOS</h3>
                    
                    {
                        state.usuarios && state.usuarios.map(usuario => (
                            <Form onSubmit={handleSubmit3}>
                                <div key={usuario.id} style={{marginTop:"20px"}}>
                                    <FormGroup>
                                        <div>
                                            <span name="id" id="id" value={usuario.id}></span>
                                        </div>
                                        <div style={{float:"left", marginRight:"10px", width:"20%"}}>
                                            <b name="nombreusuario">{usuario.nombre}</b> 
                                            <p>{usuario.email}</p> 
                                        </div>
                                        <Button className="buton" type="submit" name="cederpresidencia"> Ceder presidencia </Button>
                                        <Button className="buton" type="submit" name="cambiarpermisos"> Habilitar/deshabilitar</Button>
                                        {usuario.estado ? <b className="buton" style={{color:"darkgreen"}}>Habilitado</b> : 
                                            <b className="buton" style={{color:"darkred"}}>Deshabilitado</b>}
                                    </FormGroup>
                            </div>  
                           </Form>
                       ))
                   }
                 
                   </div>
    
                <div className="footer" >
                    <b>TuComunidad 2023</b>
                </div>
            </div>
        )    
    }
}

