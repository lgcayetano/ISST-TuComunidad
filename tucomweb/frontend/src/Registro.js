import { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import './Registro.css'
import { apiURL, AuthContext } from './App';
import { Form, FormGroup, FormFeedback, FormText, Button, Card, CardBody, CardGroup, CardText, CardTitle, Container, Input, Label } from 'reactstrap';


export default function Registro () {
    /*
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");
    const [query3, setQuery3] = useState("");
    const [query4, setQuery4] = useState("");

    function registrar(text, text2, text3, text4){
        return;
    }
    */

    const [state, setState] = useState({
        nombre: '', 
        email: '', 
        contrasena: '', 
        codigoregistro: '', 
        invalid_nombre: false, 
        invalid_email: false, 
        invalid_contrasena: false, 
        invalid_codigo: false, 
        respuesta_error: '', 
        registro: false
    });

    const { setAuthenticated } = useContext(AuthContext);

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        });

        setState({
            invalid_nombre: false,
            invalid_email: false,
            invalid_contrasena: false,
            invalid_codigo: false
        });
    }

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();

        const dataLogin = new FormData(event.target);
        await fetch(apiURL + '/registro', {
            method: 'POST',
            credentials: 'include',
            body: dataLogin
        }).then((response) => {
            return response.text()
        })
        .then((result) => {
            let arrayResult = result.split("|");

            if (arrayResult[0]==="OK")
                setAuthenticated(true);
            else
                setAuthenticated(false);

            if (arrayResult[0]==="error_email") {
                setState({
                    invalid_email: true,
                    respuesta_error: arrayResult[1]
                });
            } else if (arrayResult[0]==="error_nombre") {
                setState({
                    invalid_nombre: true,
                    respuesta_error: arrayResult[1]
                });
            } else if (arrayResult[0]==="error_contrasena") {
                setState({
                    invalid_contrasena: true,
                    respuesta_error: arrayResult[1]
                });
            } else if (arrayResult[0]==="error_codigo") {
                setState({
                    invalid_codigo: true,
                    respuesta_error: arrayResult[1]
                });
            } else if (arrayResult[0]==="OK") {
                setState({
                    invalid: false,
                    registro: true
                });
            }
        });
    }

    if (state.registro) {
        return (
            <Redirect to='/' />
        )
    } else {
        return(

            <div id="CuadroRegistro">

                <div id="cabecera"><h1 className="titulo"><b>TuComunidad</b></h1></div>

                <p style={{textAlign: "center", marginTop:"2%"}}><h3 className="info"><b>Datos de nuevo usuario</b></h3></p>
                <div id="cuadro">
                    <div id="datos">
                    {/*
                    <p></p>
                    <label > <b>Nombre y Apellidos</b> </label>
                    <input type="text" placeholder="Añada nombre y apellidos" value={query} onChange={e=>setQuery(e.target.value)}></input>
                    <label > <b>Contraseña</b> </label>
                    <input type="Password" placeholder="Añada contraseña" value={query2} onChange={e=>setQuery2(e.target.value)}></input>
                    <label > <b>E-mai</b>l </label>
                    <input type="text" placeholder="Añada correo electrónico" value={query3} onChange={e=>setQuery3(e.target.value)}></input>
                    <label > <b>Código de acceso</b> </label>
                    <input type="text" placeholder="Añada código de acceso" value={query4} onChange={e=>setQuery4(e.target.value)}></input>
                    <p></p>
                    <p style={{textAlign: "center"}}><button onClick={()=>(registrar(query, query2, query3, query4))}>Registrar</button></p>
                    */}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombre"><b style={{}}>Nombre y Apellidos</b></Label>
                            <Input className="innput" type="text" name="nombre" id="nombre" value={state.nombre}
                                onChange={handleChange} invalid={state.invalid_nombre}/>
                            <FormFeedback invalid={state.invalid_nombre}>{state.respuesta_error}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email"><b >Email</b></Label>
                            <Input className="innput" type="email" name="email" id="email" value={state.email}
                                onChange={handleChange} invalid={state.invalid_email}/>
                            <FormFeedback invalid={state.invalid_email}>{state.respuesta_error}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contrasena"><b>Contraseña</b></Label>
                            <Input className="innput" type="password" name="contrasena" id="contrasena" value={state.contrasena}
                                onChange={handleChange} invalid={state.invalid_contrasena}/>
                            <FormFeedback invalid={state.invalid_contrasena}>{state.respuesta_error}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoregistro"><b>Código de acceso</b></Label>
                            <Input className="innput"type="text" name="codigoregistro" id="codigoregistro" value={state.codigoregistro}
                                onChange={handleChange} invalid={state.invalid_codigo}/>
                            <FormFeedback invalid={state.invalid_codigo}>{state.respuesta_error}</FormFeedback>
                        </FormGroup>
                        <FormGroup style={{textAlign:"center"}}>
                            <Button type="submit" style={{}}>Registrarse</Button>
                        </FormGroup>
                    </Form>
                    </div>
                </div>
                <div className="footer">
                    <b>TuComunidad 2023</b>
                </div>
            </div>
        )
    }
}