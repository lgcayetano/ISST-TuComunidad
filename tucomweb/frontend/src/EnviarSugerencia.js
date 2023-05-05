import './Comunicados.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Header from './Header';
export default function EnviarSugerencia () {

    const [state, setState] = useState({
        title: '', text: '', invalid_mensaje: '', publicado: false
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        let errorMensaje = state.invalid_mensaje;
        if (name=='text') errorMensaje = '';

        setState({
            [name]: value,
            invalid_mensaje: errorMensaje
        });
    }

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();

        if (event.target.elements.text.value=='')
        {
            
            let mensajeVacio = '';
            if (event.target.elements.text.value=='') mensajeVacio = 'is-invalid ';

            setState({
                
                invalid_mensaje: mensajeVacio,
            });

        } else {
            const sugerencias = new FormData();
            sugerencias.append('mensaje', event.target.elements.text.value);
            await fetch(apiURL + '/sugerencias/nueva', {
                method: 'POST',
                credentials: 'include',
                body: sugerencias
            }).then((response) => {

                if (response.status===200) {
                    setState({
                        publicado:true
                    });
                }
            });
        }
    }

    if (state.publicado) {
        return (
            alert("Sugerencia enviada"),
            <Redirect to='/' />
        )
    } else {
        return(
            <div>
                <Header />
                <div className="cuerpo">
                    <div className="comunicados" >
                        <div id="datos">

                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="text"><b>Sugerencia a escribir</b></Label>
                                    <textarea name="text" id="text" value={state.text} style={{height:"300px", width:"100%"}}
                                            onChange={handleChange} className={state.invalid_mensaje + "form-control"}  />
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