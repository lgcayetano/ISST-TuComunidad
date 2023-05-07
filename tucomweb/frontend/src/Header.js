import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import { Link, Redirect, NavLink } from 'react-router-dom';

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
                        <b id="nombrecomunidad" style={{position:'fixed', color:"black", top:"2%", left:"2%"}}>{state.comunidad}</b>
                        <b style={{position:'fixed', color:"black", top:"2%", right:"2%"}}>{state.usuario} (<Link to="" onClick={logoutClick}>Salir</Link>)</b>
                        <h1 className="titulo"><b>TuComunidad</b></h1>
                    </p>    
                </div>
                <div id="menuNav">
                    <NavLink exact to="/" activeClassName="active">
                        <div className="otrapaginausuario" style={{top:"10%", textAlign:"center"}}><b className="pagina">Comunicados</b></div>
                    </NavLink>
                    <NavLink to="/votaciones" activeClassName="active">
                        <div className="otrapaginausuario" style={{top:"38%", textAlign:"center"}}> <b className="pagina">Votaciones</b></div>
                    </NavLink>
                    <NavLink to ='/enviarsugerencia' activeClassName="active">
                    <div className="otrapaginausuario" style={{top:"66%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                    </NavLink>
                    { state.presidente &&
                        <NavLink to="/publicarcomunicado" activeClassName="active">
                            <div className="otrapaginaadmin" style={{top:"10%", textAlign:"center"}}><b className="pagina">Publicar comunicados</b></div>
                        </NavLink> 
                    }
                    { state.presidente &&
                        <NavLink to ="/publicarvotacion" activeClassName="active">
                            <div className="otrapaginaadmin"style={{top:"38%", textAlign:"center"}}><b className="pagina">Publicar votaciones</b></div>
                        </NavLink>
                    }
                    { state.presidente && 
                        <NavLink to ='/gestioncomunidad' activeClassName="active">
                            <div className="otrapaginaadmin"style={{top:"66%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                        </NavLink>
                    }
                </div>
            </div>
                    
        );
    }
}