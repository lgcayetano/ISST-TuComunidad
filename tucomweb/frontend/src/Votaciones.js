import "./Votaciones.css";
import React, { useState, useEffect } from 'react';
import { apiURL, PollsApiURL } from './App';
import Header from './Header';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';

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
        
        let pollsApiKey = "";

        await fetch(apiURL + '/votacion/apikey', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => pollsApiKey = data);

        //////////////////////////////////////////////////////////////////
        let respuestaApi = JSON.parse('{"status":"success","statusCode":200,"data":{"docs":[{"data":"null","identifier":"1","question":"eeee","created_at":"2023-05-01T12:28:08.581Z","updated_at":"2023-05-01T12:28:08.581Z","id":"644fb05825e6ed0010f8a8a0","entity":"Poll","options":[{"data":"null","text":"asd","votes_count":0,"poll_id":"644fb05825e6ed0010f8a8a0","created_at":"2023-05-01T12:28:08.587Z","updated_at":"2023-05-01T12:28:08.587Z","id":"644fb05825e6ed0010f8a8a1","entity":"Option"},{"data":"null","text":"asd","votes_count":0,"poll_id":"644fb05825e6ed0010f8a8a0","created_at":"2023-05-01T12:28:08.587Z","updated_at":"2023-05-01T12:28:08.587Z","id":"644fb05825e6ed0010f8a8a2","entity":"Option"}]},{"data":"null","identifier":"1","question":"Esto es una pregunta de prueba","created_at":"2023-05-01T11:30:13.383Z","updated_at":"2023-05-01T11:30:13.383Z","id":"644fa2c59e9c2c0010ee5d1d","entity":"Poll","options":[{"data":"null","text":"Respuesta 1","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d1e","entity":"Option"},{"data":"null","text":"Respuesta 2","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d1f","entity":"Option"},{"data":"null","text":"Respuesta 3","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d20","entity":"Option"},{"data":"null","text":"Respuesta 4","votes_count":0,"poll_id":"644fa2c59e9c2c0010ee5d1d","created_at":"2023-05-01T11:30:13.390Z","updated_at":"2023-05-01T11:30:13.390Z","id":"644fa2c59e9c2c0010ee5d21","entity":"Option"}]},{"data":"null","identifier":"1","question":"Pregunta TuCom ¿sí o ño?","created_at":"2023-04-30T20:57:26.303Z","updated_at":"2023-04-30T20:57:26.303Z","id":"644ed6369e9c2c0010ee5ce3","entity":"Poll","options":[{"data":"null","text":"Sí","votes_count":0,"poll_id":"644ed6369e9c2c0010ee5ce3","created_at":"2023-04-30T20:57:26.306Z","updated_at":"2023-04-30T20:57:26.306Z","id":"644ed6369e9c2c0010ee5ce4","entity":"Option"},{"data":"null","text":"Ño","votes_count":0,"poll_id":"644ed6369e9c2c0010ee5ce3","created_at":"2023-04-30T20:57:26.307Z","updated_at":"2023-04-30T20:57:26.307Z","id":"644ed6369e9c2c0010ee5ce5","entity":"Option"}]},{"data":"null","identifier":"1","question":"asd","created_at":"2023-04-30T20:45:43.441Z","updated_at":"2023-04-30T20:45:43.441Z","id":"644ed3779e9c2c0010ee5ce0","entity":"Poll","options":[{"data":"null","text":"asdasdads","votes_count":0,"poll_id":"644ed3779e9c2c0010ee5ce0","created_at":"2023-04-30T20:45:43.448Z","updated_at":"2023-04-30T20:45:43.448Z","id":"644ed3779e9c2c0010ee5ce1","entity":"Option"},{"data":"null","text":"asdasdasdasdasd","votes_count":0,"poll_id":"644ed3779e9c2c0010ee5ce0","created_at":"2023-04-30T20:45:43.448Z","updated_at":"2023-04-30T20:45:43.448Z","id":"644ed3779e9c2c0010ee5ce2","entity":"Option"}]}],"totalDocs":4,"offset":0,"limit":25,"totalPages":1,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}');
        /*
        await fetch(PollsApiURL + '/get/polls-with-identifier/' + pollIdentifier, {
            headers: {
                'api-key': pollsApiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            setState({ votaciones: data });
        });
        */
        setState({ votaciones: respuestaApi.data.docs });
        //////////////////////////////////////////////////////////////////

        



    }, []);

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton votar (submit)
        event.preventDefault();

        console.log(event);
        console.log(event.target.elements);
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
                    state.votaciones && state.votaciones.map(votacion => (
                        <Form onSubmit={handleSubmit} key={votacion.id} id={votacion.id} className="votaciones">
                            <FormGroup>
                                <b>{votacion.question}</b> <span style={{float:'right'}}>{convertDate(votacion.created_at)}</span>
                            </FormGroup>
                            <FormGroup style={{marginLeft:"10px"}}>
                            {
                                votacion.options && votacion.options.map(opcion => (
                                    <FormGroup key={opcion.id} style={{marginTop:"10px"}}>
                                        <Label>
                                            <Input type="radio" id={opcion.id} name={votacion.id} style={{marginTop:"5px", marginRight:"6px"}}/>
                                            {opcion.text}
                                        </Label>
                                    </FormGroup>
                                ))
                            }
                            </FormGroup>
                            <FormGroup style={{margin:"10px", textAlign:"center"}}>
                                <Button id="submitBoton" type="submit" size='sm'>Votar</Button>
                            </FormGroup>
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