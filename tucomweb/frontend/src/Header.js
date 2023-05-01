import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import { Link, Redirect } from 'react-router-dom';

export default function Header () {
    const [state, setState] = useState({
         usuario: '', comunidad: '', presidente: false, redirect_login: false
    });

    useEffect(() => {

        let promises = [];

        promises.push(fetch(apiURL + '/usuario', {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) return response.text();
            else setState({ redirect_login: true });
        }));

        promises.push(fetch(apiURL + '/comunidad', {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) return response.text();
            else setState({ redirect_login: true });
        }));

        promises.push(fetch(apiURL + '/usuario/nivel', {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) return response.text();
            else setState({ redirect_login: true });
        }));

        Promise.all(promises)
        .then(data => {

            let data2 = false;
            if (data[2]=="1")
                data2 = true;

            setState({
                usuario: data[0],
                comunidad: data[1],
                presidente: data2
            });
        });

    }, []);

    async function logoutClick() {
        
        await fetch(apiURL + '/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(async (response) => {
            setState({ redirect_login: true });
        });
    }

    if (state.redirect_login) {
        return (
            <Redirect to='/login' />
        )
    } else {
        return(
            <div>
                <div id="cabecera">    
                    <p>
                        <b style={{position:'fixed', color:"black", top:"2%", left:"2%"}}>{state.comunidad}</b>
                        <b style={{position:'fixed', color:"black", top:"2%", right:"2%"}}>{state.usuario} (<Link to="" onClick={logoutClick}>Salir</Link>)</b>
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
                    <Link to ='/enviarsugerencia'>
                    <div className="otrapaginausuario" style={{top:"70%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                    </Link>
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
                        <Link to ='/gestioncomunidad'>
                            <div className="otrapaginaadmin"style={{top:"70%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                        </Link>
                    }
                </div>
            </div>
                    
        );
    }
}