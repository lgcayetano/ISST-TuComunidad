import "./PublicarVotacion.css"
import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import Header from './Header';

export default function PublicarVotacion () {

    const [state, setState] = useState({
        text: '', op1:'',op2:'',op3:'',op4:'',op5:'', invalid_mensaje: '', publicado: false,  usuario: '', comunidad: '', presidente: false
    });

    useEffect(() => {

        let promises = [];

        promises.push(fetch(apiURL + '/usuario', {
            credentials: 'include'
        })
        .then(response => response.text()));

        promises.push(fetch(apiURL + '/comunidad', {
            credentials: 'include'
        })
        .then(response => response.text()));

        promises.push(fetch(apiURL + '/usuario/nivel', {
            credentials: 'include'
        })
        .then(response => response.text()));
        
        Promise.all(promises)
        .then(data => {

            let data2 = false;
            if (data[2]=="1")
                data2 = true;

            setState({
                usuario: data[0],
                comunidad: data[1],
                presidente: data2,
            })
        });

    }, []);

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        });

        setState({
            invalid_titulo: false,
            invalid_mensaje: '',
            usuario: state.usuario,
            comunidad: state.comunidad
        });
    }

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();

        if (event.target.elements.title.value=='' && event.target.elements.text.value=='')
        {
            setState({
                invalid_titulo: true,
                invalid_mensaje: 'is-invalid form-control',
                usuario: state.usuario,
                comunidad: state.comunidad
            });
        }
        else if (event.target.elements.title.value=='')
        {
            setState({
                invalid_titulo: true,
                invalid_mensaje: '',
                usuario: state.usuario,
                comunidad: state.comunidad
            });
        }
        else if (event.target.elements.text.value=='')
        {
            setState({
                invalid_titulo: false,
                invalid_mensaje: 'is-invalid form-control',
                usuario: state.usuario,
                comunidad: state.comunidad
            });
        }
        else
        {/*
            Las sugerencias no se publican directamente en la web,
            estas serán enviadas por email al presidente de nuestra comunidad.
            Para ello debemos:
            
            -Buscar en que comunidad nos encontramos
            -Buscar el presidente de nuestra comunidad
            -Buscar el correo asociado al presidente de nuestra comunidad
            -Enviar dicha sugerencias con un email
            
            
            */
        }
    }

    if (state.publicado) {
        return (
            alert("Sugerencia enviada")
        )
    } else {

        return(
            <div>
                <Header />
                <div className="cuerpo">
                    <div className="comunicados">
                        <div id="datos">
                            <Form onSubmit={handleSubmit}>
                                <FormGroup style={{textAlign:"center", height:"60px"}}>
                                    <h3><b>Publicar Votacion</b></h3>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Título</Label>
                                    <textarea name="text" id="text" value={state.text} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Opción 1</Label>
                                    <textarea name="op1" id="op1" value={state.op1} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Opción 2</Label>
                                    <textarea name="op2" id="op2" value={state.op2} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Opción 3</Label>
                                    <textarea name="op3" id="op3" value={state.op3} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Opción 4</Label>
                                    <textarea name="op4" id="op4" value={state.op4} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Opción 5</Label>
                                    <textarea name="op5" id="op5" value={state.op1} style={{height:"30px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}/>

                                </FormGroup>


                                <FormGroup style={{marginTop:"20px", textAlign:"center"}}>
                                    <Button type="submit">Publicar Votacion</Button>
                                </FormGroup>
                            </Form>
                        </div>

                    </div>
                </div>
                
                
    
    
                
                
                <div className="footer" >
                    <b>TuComunidad 2023</b>
                </div>
            </div>
        )    

    }




    

}