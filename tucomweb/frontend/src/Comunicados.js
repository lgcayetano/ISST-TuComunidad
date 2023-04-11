import React, { useState, useEffect } from 'react';
import './Comunicados.css'
import { Link } from 'react-router-dom';
import { apiURL } from './App';

export default function Comunicados () {

    const [state, setState] = useState({
        comunicados: [], usuario: '', comunidad: '', presidente: false
    });

    useEffect(async () => {

        /*
        await fetch(apiURL + '/usuario', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => setState({usuario: data}));

        await fetch(apiURL + '/comunidad', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => setState({comunidad: data}));

        await fetch(apiURL + '/usuario/nivel', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(data => {
            if (data==1)
                setState({presidente: true});
        });
        */

        await fetch(apiURL + '/comunicados', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setState({comunicados: data}));
        
    }, []);

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
                    <b style={{position:'absolute', color:"black", top:"2%", right:"2%"}}>{state.usuario}</b>
                    <h1 className="titulo"><b>TuComunidad</b></h1>
                    
                </p>
            </div>
            <div className="cuerpo">
                <div className="paginausuario" style={{top:"10%", textAlign:"center"}}><b className="pagina">Comunicados</b></div>
                <div className="otrapaginausuario" style={{top:"40%", textAlign:"center"}}> <b className="pagina">Votaciones</b></div>
                <div className="otrapaginausuario" style={{top:"70%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                <Link to="/publicarcomunicado">
                    <div className="otrapaginaadmin" style={{top:"10%", textAlign:"center"}}><b className="pagina">Publicar comunicados</b></div>
                </Link>               
                <div className="otrapaginaadmin"style={{top:"40%", textAlign:"center"}}><b className="pagina">Publicar votaciones</b></div>
                <div className="otrapaginaadmin"style={{top:"70%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                
                {
                    state.comunicados.map(comunicado => (
                        <div key={comunicado.id} className="comunicados" >
                            <b style={{size:"50"}}>{comunicado.titulo}</b> {convertDate(comunicado.fecha)}
                            <p>{comunicado.mensaje}</p>
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