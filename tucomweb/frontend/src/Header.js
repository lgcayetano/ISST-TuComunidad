import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import { Link } from 'react-router-dom';
export default function Header () {
    const [state, setState] = useState({
         usuario: '', comunidad: '', presidente: false
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
                presidente: data2
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


    return(
        <div>
            <div id="cabecera">    
                <p>
                    <b style={{position:'absolute', color:"black", top:"2%", left:"2%"}}>{state.comunidad}</b>
                    <b style={{position:'absolute', color:"black", top:"2%", right:"2%"}}>{state.usuario} (<Link onClick={logoutClick}>Salir</Link>)</b>
                    <h1 className="titulo"><b>TuComunidad</b></h1>
                </p>    
            </div>
            <div>
                <Link to="/">
                    <div className="otrapaginausuario" style={{top:"10%", textAlign:"center"}}><b className="pagina">Comunicados</b></div>
                </Link>
                <Link to="/votaciones">
                    <div className="otrapaginausuario" style={{top:"40%", textAlign:"center"}}> <b className="pagina">Votaciones</b></div>
                </Link>
                <div className="otrapaginausuario" style={{top:"70%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                
                { state.presidente &&
                    <Link to="/publicarcomunicado">
                        <div className="otrapaginaadmin" style={{top:"10%", textAlign:"center"}}><b className="pagina">Publicar comunicados</b></div>
                    </Link> 
                }
                { state.presidente &&
                    <Link to ="/publicarvotacion">
                        <div className="otrapaginaadmin"style={{top:"40%", textAlign:"center"}}><b className="pagina">Publicar votaciones</b></div>
                    </Link>
                }
                { state.presidente && 
                    <div className="otrapaginaadmin"style={{top:"70%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                }
            </div>
        </div>
                
    );
}