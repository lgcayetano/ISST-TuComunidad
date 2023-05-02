import "./Votaciones.css";
import React, { useState, useEffect } from 'react';
import { apiURL, PollsApiURL } from './App';
import Header from './Header';
import { Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import ProgressBar from './ProgressBar';

export default function Votaciones () {

    const [state, setState] = useState({
        votaciones: []
    });

    useEffect(async () => {

        let pollIdentifier = "0";

        await fetch(apiURL + '/comunidad/id', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => pollIdentifier = data);

        let voteIdentifier = "0";
        
        await fetch(apiURL + '/usuario/id', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => voteIdentifier = data);
        
        let pollsApiKey = "";

        await fetch(apiURL + '/votacion/apikey', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => pollsApiKey = data);

        let ArrVotos = [];

        //////////////////////////////////////////////////////////////////
        //let votesAPI_data = JSON.parse('{"status":"success","statusCode":200,"data":{"docs":[{"identifier":"1","poll_id":"644ed3779e9c2c0010ee5ce0","option_id":"644ed3779e9c2c0010ee5ce2","created_at":"2023-05-02T11:39:06.847Z","updated_at":"2023-05-02T11:39:06.847Z","id":"6450f65a9e9c2c0010ee5d55","entity":"Vote"},{"identifier":"1","poll_id":"644fa2c59e9c2c0010ee5d1d","option_id":"644fa2c59e9c2c0010ee5d1f","created_at":"2023-05-02T11:10:53.438Z","updated_at":"2023-05-02T11:10:53.438Z","id":"6450efbd25e6ed0010f8a8bd","entity":"Vote"},{"identifier":"1","poll_id":"644d64ec25e6ed0010f8a866","option_id":"644d64ec25e6ed0010f8a868","created_at":"2023-04-29T18:58:46.639Z","updated_at":"2023-04-29T18:58:46.639Z","id":"644d68e625e6ed0010f8a86a","entity":"Vote"},{"identifier":"1","poll_id":"644d64ec25e6ed0010f8a866","option_id":"644d64ec25e6ed0010f8a868","created_at":"2023-04-29T18:58:12.650Z","updated_at":"2023-04-29T18:58:12.650Z","id":"644d68c425e6ed0010f8a869","entity":"Vote"}],"totalDocs":4,"offset":0,"limit":25,"totalPages":1,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}');
        ///*
        await fetch(PollsApiURL + '/get/votes-with-identifier/' + voteIdentifier, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': pollsApiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            ArrVotos = data.data.docs;
        });
        //*/
        //ArrVotos = votesAPI_data.data.docs;
        //////////////////////////////////////////////////////////////////

        let ArrVotaciones = [];

        //////////////////////////////////////////////////////////////////
        //let pollsAPI_data = JSON.parse('{"status":"success","statusCode":200,"data":{"docs":[{"data":"null","identifier":"1","question":"eeee","created_at":"2023-05-01T12:28:08.581Z","updated_at":"2023-05-01T12:28:08.581Z","id":"644fb05825e6ed0010f8a8a0","entity":"Poll","options":[{"data":"null","text":"asd","votes_count":0,"poll_id":"644fb05825e6ed0010f8a8a0","created_at":"2023-05-01T12:28:08.587Z","updated_at":"2023-05-01T12:28:08.587Z","id":"644fb05825e6ed0010f8a8a1","entity":"Option"},{"data":"null","text":"asd","votes_count":0,"poll_id":"644fb05825e6ed0010f8a8a0","created_at":"2023-05-01T12:28:08.587Z","updated_at":"2023-05-01T12:28:08.587Z","id":"644fb05825e6ed0010f8a8a2","entity":"Option"}]},{"data":"null","identifier":"1","question":"Esto es una pregunta de prueba","created_at":"2023-05-01T11:30:13.383Z","updated_at":"2023-05-01T11:30:13.383Z","id":"644fa2c59e9c2c0010ee5d1d","entity":"Poll","options":[{"data":"null","text":"Respuesta 1","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d1e","entity":"Option"},{"data":"null","text":"Respuesta 2","votes_count":1,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-02T11:10:53.434Z","id":"644fa2c59e9c2c0010ee5d1f","entity":"Option"},{"data":"null","text":"Respuesta 3","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d20","entity":"Option"},{"data":"null","text":"Respuesta 4","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d21","entity":"Option"}]},{"data":"null","identifier":"1","question":"Pregunta TuCom ¿sí o ño?","created_at":"2023-04-30T20:57:26.303Z","updated_at":"2023-04-30T20:57:26.303Z","id":"644ed6369e9c2c0010ee5ce3","entity":"Poll","options":[{"data":"null","text":"Sí","votes_count":0,"poll_id":"644ed6369e9c2c0010ee5ce3","created_at":"2023-04-30T20:57:26.306Z","updated_at":"2023-04-30T20:57:26.306Z","id":"644ed6369e9c2c0010ee5ce4","entity":"Option"},{"data":"null","text":"Ño","votes_count":0,"poll_id":"644ed6369e9c2c0010ee5ce3","created_at":"2023-04-30T20:57:26.307Z","updated_at":"2023-04-30T20:57:26.307Z","id":"644ed6369e9c2c0010ee5ce5","entity":"Option"}]},{"data":"null","identifier":"1","question":"asd","created_at":"2023-04-30T20:45:43.441Z","updated_at":"2023-04-30T20:45:43.441Z","id":"644ed3779e9c2c0010ee5ce0","entity":"Poll","options":[{"data":"null","text":"asdasdads","votes_count":0,"poll_id":"644ed3779e9c2c0010ee5ce0","created_at":"2023-04-30T20:45:43.448Z","updated_at":"2023-04-30T20:45:43.448Z","id":"644ed3779e9c2c0010ee5ce1","entity":"Option"},{"data":"null","text":"asdasdasdasdasd","votes_count":0,"poll_id":"644ed3779e9c2c0010ee5ce0","created_at":"2023-04-30T20:45:43.448Z","updated_at":"2023-04-30T20:45:43.448Z","id":"644ed3779e9c2c0010ee5ce2","entity":"Option"}]}],"totalDocs":4,"offset":0,"limit":25,"totalPages":1,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}');
        ///*
        await fetch(PollsApiURL + '/get/polls-with-identifier/' + pollIdentifier, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': pollsApiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            ArrVotaciones = data.data.docs;
        });
        //*/
        //ArrVotaciones = pollsAPI_data.data.docs;
        //////////////////////////////////////////////////////////////////
        
        ArrVotaciones.map((votacion) => (votacion.voted = false));

        ArrVotos.map((voto) => {
            let poll_id = voto.poll_id;
            ArrVotaciones = ArrVotaciones.map((votacion) => (votacion.id == poll_id ? {...votacion, voted: true} : votacion));
        });

        setState({ votaciones: ArrVotaciones });

    }, []);

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton votar (submit)
        event.preventDefault();

        let idForm = event.target.id;
        let valInput = event.target.elements[idForm].value;

        if (valInput == '' || valInput == null) {
            document.querySelector('#' + idForm + ' .mensajeValidacion').style.display = 'block';
        } else {
            document.querySelector('#' + idForm + ' button[type="submit"]').disabled = true;
            document.querySelector('#' + idForm + ' button[type="submit"]').firstChild.data = "Registrando voto...";

            let voteIdentifier = "0";
        
            await fetch(apiURL + '/usuario/id', {
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => voteIdentifier = data);

            let idVotacion = idForm.substring(4);
            let idOpcion = valInput.substring(4);

            let pollsApiKey = "";

            await fetch(apiURL + '/votacion/apikey', {
                credentials: 'include'
            })
            .then(response => response.text())
            .then(data => pollsApiKey = data);

            let votoApi = {
                poll_id: idVotacion,
                option_id: idOpcion,
                identifier: voteIdentifier
            };

            let ArrVotaciones = state.votaciones;
            let ArrVotos = [];

            await fetch(PollsApiURL + '/create/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': pollsApiKey
                },
                body: JSON.stringify(votoApi)
            })
            .then((response) => {

                if (response.status===200) {
                    
                    ArrVotaciones.map((votacion) => {
                        if (votacion.id == idVotacion)
                            ArrVotos = votacion.options.map((opcion) => (opcion.id == idOpcion ? {...opcion, votes_count: (opcion.votes_count + 1)} : opcion));
                    });
        
                    ArrVotaciones = ArrVotaciones.map((votacion) => (votacion.id == idVotacion ? {...votacion, options: ArrVotos, voted: true} : votacion));
        
                    setState({ votaciones: ArrVotaciones });

                } else {
                    alert("Ha ocurrido un error. Por favor, vuelva a intentarlo de nuevo.");
                    window.location.reload();
                }
            });

        }

    }

    function convertDate(datetext) {
        const date = new Date(datetext);

        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

    return(
        <div>
            <Header />
            <div className="cuerpo">
                {
                    state.votaciones && state.votaciones.map(votacion => {

                        let totalVotos = 0;
                        votacion.options && votacion.options.map(opcion => totalVotos = totalVotos + opcion.votes_count);

                        if (totalVotos <= 0) totalVotos = 1;

                        if (votacion.voted) {
                            return (
                                <div key={'pid_' + votacion.id} id={'pid_' + votacion.id} className="votaciones" style={{paddingBottom:'20px'}}>
                                    <b>{votacion.question}</b> <span style={{float:'right'}}>{convertDate(votacion.created_at)}</span>
                                    {
                                        votacion.options && votacion.options.map(opcion => (
                                            <div key={'oid_' + opcion.id} id={'oid_' + opcion.id} style={{margin:'10px 10px 0 10px'}}>
                                                {opcion.text} <span style={{float:'right', fontSize:'14px'}}>{opcion.votes_count} voto{opcion.votes_count == 1 ? '' : 's'}</span>
                                                <ProgressBar bgcolor="black" completed={Math.round(opcion.votes_count/totalVotos*100)} />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        } else {
                            return (
                                <Form onSubmit={handleSubmit} key={'pid_' + votacion.id} id={'pid_' + votacion.id} className="votaciones">
                                    <FormGroup>
                                        <b>{votacion.question}</b> <span style={{float:'right'}}>{convertDate(votacion.created_at)}</span>
                                    </FormGroup>
                                    <FormGroup style={{marginLeft:"10px"}}>
                                        {
                                            votacion.options && votacion.options.map(opcion => (
                                                <FormGroup key={'oid_' + opcion.id} style={{marginTop:"10px"}}>
                                                    <Label>
                                                        <Input type="radio" id={'oid_' + opcion.id} name={'pid_' + votacion.id} value={'oid_' + opcion.id} style={{marginTop:"5px", marginRight:"6px"}}/>
                                                        {opcion.text}
                                                    </Label>
                                                </FormGroup>
                                            ))
                                        }
                                        <FormFeedback className="mensajeValidacion" style={{display:"none", marginTop:"10px"}}>Seleccione una opción</FormFeedback>
                                    </FormGroup>
                                    <FormGroup style={{margin:"10px", textAlign:"center"}}>
                                        <Button type="submit" size='sm'>Votar</Button>
                                    </FormGroup>
                                </Form>
                            )
                        }
                    })
                }

            </div>
            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}