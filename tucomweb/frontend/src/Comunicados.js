import React, { useState, useEffect } from 'react';
import { apiURL } from './App';
import Header from './Header';

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