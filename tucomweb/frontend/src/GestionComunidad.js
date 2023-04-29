import './Comunicados.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Header from './Header';
import "./GestionComunidad.css";
export default function GestionComunidad () {

    const [state, setState] = useState({
        usuarios: [],
        nombre: '', 
        codigopresidente: '',
        codigovecinos: ''
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        });
    }


    useEffect(() => {

        let promises = [];

        promises.push(fetch(apiURL + '/comunidad', {
            credentials: 'include'
        })
        .then(response => response.text()));

        //Importante, hay que hacer en tucomAPI que eso sea posible
        promises.push(fetch(apiURL + '/comunidad/codigopresidente', {
            credentials: 'include'
        })
        .then(response => response.text()));

        //Importante, hay que hacer en tucomAPI que eso sea posible
        promises.push(fetch(apiURL + '/comunicados/codigovecinos', {
            credentials: 'include'
        })
        .then(response => response.json()));

        promises.push(fetch(apiURL + '/usuarios', {
            credentials: 'include'
        })
        .then(response => response.json()));
        
        Promise.all(promises)
        .then(data => {
            setState({
                nombre: data[0],
                codigopresidente: data[1],
                codigovecinos: data[2],
                usuarios: data[3]
            })
        });

    }, []);


    //No sé por qué me da error chungo
    /*
    function eliminarUsuario(int id){
        usuarioss = state.usuarios.length;
        for (int i=1, i<=usuarioss.length, i++){
            if (i==id){
                usuarioss.splice(i, 1)
            }
            break;
        }
        setState({usuarios: usuarioss});
        
    }
    */

    return(
        <div>
            <Header />
            
            <div className="comunicados" style={{marginBottom:"20px"}}>

                <Form /*onSubmit={handleSubmit}*/>
                    <FormGroup className="cambioNombre">
                        <p><b>Nombre de la comunidad</b></p>
                        <Input className="innnput" type="text" placeholder={state.nombre}
                             value={state.nombre}  onChange={handleChange}  />
                       
                        <Button className='buton' type="submit" >Cambiar nombre de la comunidad</Button>
                    </FormGroup>
                    <FormGroup className="cambioNombre">
                        <p><b>Nombre de la comunidad</b></p>
                        <Input className="innnput" type="text" placeholder={state.codigopresidente}
                             value={state.codigopresidente}  onChange={handleChange}/>
                        <Button className='buton' type="submit">Cambiar código del presidente</Button>
                    </FormGroup> 
                    <FormGroup className="cambioNombre">
                        <p><b>Nombre de la comunidad</b></p>
                        <Input className="innnput" type="text" placeholder={state.codigovecinos}
                             value={state.codigovecinos}  onChange={handleChange}/>
                        <Button className='buton' type="submit">Cambiar código de los vecinos</Button>
                    </FormGroup> 
                </Form>
            </div>

            <div className="comunicados" >
                <h3 style={{color:"rgb(164, 40, 40)"}}>LISTA DE USUARIOS</h3>
                {
                    state.usuarios && state.usuarios.map(usuario => (
                        <div key={usuario.id} style={{marginTop:"20px"}}>
                            <div style={{float:"left", marginRight:"20px", width:"20%"}}>
                                <b>{usuario.nombre}</b> 
                                <p>{usuario.email}</p> 
                            </div>
                            <Button className="buton"> Ceder presidencia </Button>
                            <Button className="buton"> Quitar/dar permisos </Button>
                            <Button className="buton" /*onClick={eliminarUsuario(usuario.id)}*/
                                style={{backgroundColor:"rgb(164, 40, 40)"}}> X </Button>

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

