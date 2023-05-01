import './Comunicados.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Header from './Header';
export default function PublicarComunicados () {

    const [state, setState] = useState({
        title: '', text: '', invalid_titulo: false, invalid_mensaje: '', publicado: false
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let errorTitulo = state.invalid_titulo;
        if (name=='title') errorTitulo = false;

        let errorMensaje = state.invalid_mensaje;
        if (name=='text') errorMensaje = '';

        setState({
            [name]: value,
            invalid_titulo: errorTitulo,
            invalid_mensaje: errorMensaje
        });
    }

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();

        if (event.target.elements.title.value=='' || event.target.elements.text.value=='')
        {
            let tituloVacio = false;
            if (event.target.elements.title.value=='') tituloVacio = true;

            let mensajeVacio = '';
            if (event.target.elements.text.value=='') mensajeVacio = 'is-invalid ';

            setState({
                invalid_titulo: tituloVacio,
                invalid_mensaje: mensajeVacio,
            });

        } else {
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
            });
        }
    }

    if (state.publicado) {
        return (
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
                                    <Label for="title"><b>Título del nuevo comunicado</b></Label>
                                    <Input type="text" name="title" id="title" value={state.title}
                                            onChange={handleChange} invalid={state.invalid_titulo} style={{marginBottom:"20px"}}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text"><b>Comunicado a escribir</b></Label>
                                    <textarea name="text" id="text" value={state.text} style={{height:"300px", width:"100%"}}
                                            onChange={handleChange} className={state.invalid_mensaje + "form-control"}  />
                                </FormGroup>
                                <FormGroup style={{marginTop:"20px", textAlign:"center"}}>
                                    <Button type="submit">Publicar comunicado</Button>
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
