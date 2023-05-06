import "./Votaciones.css";
import React, { useState, useEffect } from 'react';
import { apiURL, PollsApiURL } from './App';
import Header from './Header';
import { Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import ProgressBar from './ProgressBar';
import loader from './loader.gif';

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

        let permisosUsuario = false;
        
        await fetch(apiURL + '/usuario/permisos', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => permisosUsuario = (data === 'true'));

        let pollsApiKey = "";

        await fetch(apiURL + '/votacion/apikey', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => pollsApiKey = data);

        let ArrVotacionesBBDD = [];

        await fetch(apiURL + '/votaciones', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => ArrVotacionesBBDD = data);

        let ArrVotos = [];

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

        let ArrVotacionesAPI = [];

        await fetch(PollsApiURL + '/get/polls-with-identifier/' + pollIdentifier, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': pollsApiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            ArrVotacionesAPI = data.data.docs;
        });

        let ArrVotaciones = [];

        ArrVotacionesAPI.map((votacion) => {
            ArrVotacionesBBDD.map((registro) => {
                if (votacion.id == registro.idpollsapi)
                    ArrVotaciones.push(votacion);
            });
        });

        let votadoPorUsuario = !permisosUsuario;

        console.log(permisosUsuario);
        console.log(votadoPorUsuario);

        ArrVotaciones.map((votacion) => (votacion.voted = votadoPorUsuario));

        ArrVotos.map((voto) => {
            let poll_id = voto.poll_id;
            ArrVotaciones = ArrVotaciones.map((votacion) => (votacion.id == poll_id ? {...votacion, voted: true} : votacion));
        });

        document.getElementById('loaderVotaciones').style.display = 'none';

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
                <div id='loaderVotaciones' style={{textAlign:"center", paddingTop:'50px'}}>
                    <img src={loader} style={{width:'70px'}}/>
                </div>
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