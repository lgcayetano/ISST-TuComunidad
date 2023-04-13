import React, { useState, useEffect } from 'react';
import './Comunicados.css'
import { Link } from 'react-router-dom';
import { apiURL } from './App';

export default function Comunicados () {

    const [state, setState] = useState({
        comunicados: [], usuario: '', comunidad: '', presidente: false
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

        promises.push(fetch(apiURL + '/comunicados', {
            credentials: 'include'
        })
        .then(response => response.json()));
        
        Promise.all(promises)
        .then(data => {

            let data2 = false;
            if (data[2]=="1")
                data2 = true;

            setState({
                usuario: data[0],
                comunidad: data[1],
                presidente: data2,
                comunicados: data[3]
            })
        });

    }, []);

    async function logoutClick() {
        const dataLogin = new FormData();
        dataLogin.append('username', '');
        dataLogin.append('password', '');
        await fetch(apiURL + '/login', {
            method: 'POST',
            credentials: 'include',
            body: dataLogin
        }).then(async (response) => {
            window.location.reload();
        });
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
            <div id="cabecera">
                <p>
                    <b style={{position:'absolute', color:"black", top:"2%", left:"2%"}}>{state.comunidad}</b>
                    <b style={{position:'absolute', color:"black", top:"2%", right:"2%"}}>{state.usuario} (<Link onClick={logoutClick}>Salir</Link>)</b>
                    <h1 className="titulo"><b>TuComunidad</b></h1>
                    
                </p>
            </div>
            <div className="cuerpo">
                <Link to="/">
                    <div className="paginausuario" style={{top:"10%", textAlign:"center"}}><b className="pagina">Comunicados</b></div>
                </Link>
                <div className="otrapaginausuario" style={{top:"40%", textAlign:"center"}}> <b className="pagina">Votaciones</b></div>
                <div className="otrapaginausuario" style={{top:"70%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                
                { state.presidente &&
                    <Link to="/publicarcomunicado">
                        <div className="otrapaginaadmin" style={{top:"10%", textAlign:"center"}}><b className="pagina">Publicar comunicados</b></div>
                    </Link> 
                }
                { state.presidente &&
                    <div className="otrapaginaadmin"style={{top:"40%", textAlign:"center"}}><b className="pagina">Publicar votaciones</b></div>
                }
                { state.presidente && 
                    <div className="otrapaginaadmin"style={{top:"70%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                }

                {
                    state.comunicados && state.comunicados.map(comunicado => (
                        <div key={comunicado.id} className="comunicados" >
                            <b style={{fontSize:'18px'}}>{comunicado.titulo}</b> <span style={{float:'right'}}>{convertDate(comunicado.fecha)}</span>
                            <p style={{paddingTop:'8px'}} dangerouslySetInnerHTML={{__html: comunicado.mensaje.replace(/(?:\r\n|\r|\n)/g, '<br>')}} />
                        </div>
                    ))
                }

            </div>
            
            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}