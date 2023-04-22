import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';

import Header from './Header';

export default function EnviarSugerencia () {

    const [state, setState] = useState({
        title: '', text: '', invalid_titulo: false, invalid_mensaje: '', publicado: false,  usuario: '', comunidad: '', presidente: false
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
            const comunicados = new FormData();
            comunicados.append('titulo', event.target.elements.title.value);
            comunicados.append('mensaje', event.target.elements.text.value);
            await fetch(apiURL + '/comunicados/nuevo', {
                method: 'POST',
                credentials: 'include',
                body: comunicados
            }).then((response) => {

                if (response.status===200) {
                    setState({
                        publicado:true
                    });
                }
            }); */
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
                                <FormGroup>
                                    <Label for="title"><b>Título de la nueva sugerencia</b></Label>
                                    <Input type="text" name="title" id="title" value={state.title}
                                        onChange={handleChange} invalid={state.invalid_titulo} style={{marginBottom:"20px"}}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text"><b>Sugerencia a realizar</b></Label>
                                    <textarea name="text" id="text" value={state.text} style={{height:"300px", width:"100%"}}
                                        onChange={handleChange} className={state.invalid_mensaje}  />
                                </FormGroup>
                                <FormGroup style={{marginTop:"20px", textAlign:"center"}}>
                                    <Button type="submit">Enviar sugerencia</Button>
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