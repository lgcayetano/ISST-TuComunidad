import "./PublicarVotacion.css"
import React, { useState, useEffect } from 'react';
import { apiURL, PollsApiURL } from './App';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import Header from './Header';

export default function PublicarVotacion () {

    const minOptions = 2;
    const maxOptions = 10;

    const [state, setState] = useState({
        title: '',
        invalid_title: false,
        options: [
            { text: '', invalid: false },
            { text: '', invalid: false }
        ],
        publicado: false
    });

    function addOption() {

        if (state.options.length < maxOptions) {

            const newOptions = [
                ...state.options,
                { text: '', invalid: false }
            ];

            if (newOptions.length > minOptions)
                document.getElementById('lessBoton').style.display = 'inline';
            
            if (newOptions.length >= maxOptions)
                document.getElementById('addBoton').style.display = 'none';

            setState({
                title: state.title,
                invalid_title: state.invalid_title,
                options: newOptions,
                publicado: state.publicado
            });
        }
    }

    function lessOption() {

        if (state.options.length > minOptions) {

            const newOptions = state.options;
            newOptions.pop();

            if (newOptions.length <= minOptions)
                document.getElementById('lessBoton').style.display = 'none';
            
            if (newOptions.length < maxOptions)
                document.getElementById('addBoton').style.display = 'inline';

            setState({
                title: state.title,
                invalid_title: state.invalid_title,
                options: newOptions,
                publicado: state.publicado
            });
        }
    }

    function handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        let errorTitulo = state.invalid_title;
        if (name=='title') errorTitulo = false;

        const newOptions = state.options;

        if (name.substring(0,2)=="op") {
            let iOption = Number(name.substring(2)) - 1;
            newOptions[iOption].text = value;
            newOptions[iOption].invalid = false;
        }

        setState({
            [name]: value,
            invalid_title: errorTitulo,
            options: newOptions,
            publicado: state.publicado
        });
    }

    async function handleSubmit(event) {
        
        //evita que se recarge la pagina al darle al boton publicar (submit)
        event.preventDefault();

        let publicar = true;

        const targetElements = event.target.elements;

        let titulo = targetElements.title.value;
        let errorTitulo = false;
        let newOptions = state.options;

        Array.from(targetElements).forEach((element) => {
            let value = element.value;
            let name = element.name;

            if (name=='title' && value=='') {
                errorTitulo = true;
                publicar = false;
            }

            if (name.substring(0,2)=="op") {
                let iOption = Number(name.substring(2)) - 1;
                newOptions[iOption].invalid = false;
                if (value=='') {
                    newOptions[iOption].invalid = true;
                    publicar = false;
                }
            }
        });

        setState({
            title: state.title,
            invalid_title: errorTitulo,
            options: newOptions,
            publicado: state.publicado
        });

        if (publicar)
        {
            document.getElementById("submitBoton").disabled = true;
            document.getElementById("submitBoton").firstChild.data = "Publicando votación...";

            let pollIdentifier = "0";

            await fetch(apiURL + '/comunidad/id', {
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => pollIdentifier = data);

            const finalOptions = newOptions.map(({invalid, ...text}) => text);

            const votacion = {
                question: titulo,
                identifier: pollIdentifier,
                options: finalOptions
            };

            let pollsApiKey = "";

            await fetch(apiURL + '/votacion/apikey', {
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => pollsApiKey = data);

            let pollCreated = false;
            let pollId = "";

            await fetch(PollsApiURL + '/create/poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': pollsApiKey
                },
                body: JSON.stringify(votacion)
            })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode===200) {
                    pollCreated = true;
                    pollId = data.data.id;
                }
            });

            if (pollCreated) {

                const pollIdForm = new FormData();
                pollIdForm.append('idpollsapi', pollId);
                await fetch(apiURL + '/votacion/nueva', {
                    method: 'POST',
                    credentials: 'include',
                    body: pollIdForm
                }).then((response) => {
                    if (response.status===200) setState({ publicado: true });
                });

            } else {
                alert("Ha ocurrido un error. Por favor, vuelva a intentarlo de nuevo.");
                window.location.reload();
            }
        }
    }

    if (state.publicado) {
        return (
            <Redirect to='/votaciones' />
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
                                    <h3><b>Publicar Votación</b></h3>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Pregunta:</Label>
                                    <Input type="text" name="title" id="title" value={state.title}
                                        onChange={handleChange} invalid={state.invalid_title} style={{marginBottom:"20px"}}/>
                                </FormGroup>
                                
                                {
                                    state.options.map((option, index) => (
                                        <FormGroup className="opcion">
                                            <Label for={"op" + (index + 1)}>Opción {(index + 1)}:</Label>
                                            <Input type="text" name={"op" + (index + 1)} id={"op" + (index + 1)} value={option.text}
                                                onChange={handleChange} invalid={option.invalid} style={{marginBottom:"10px"}}/>
                                        </FormGroup>
                                    ))
                                }

                                <FormGroup style={{marginTop:"20px", textAlign:"left"}}>
                                    <Button id="addBoton" size='sm' onClick={addOption} style={{display:"inline", marginRight:"10px"}}>+ Añadir opción</Button>
                                    <Button id="lessBoton" size='sm' onClick={lessOption} style={{display:"none"}}>- Quitar opción</Button>
                                </FormGroup>
                                <FormGroup style={{marginTop:"20px", textAlign:"center"}}>
                                    <Button id="submitBoton" type="submit">Publicar votación</Button>
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