import { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import './Registro.css'
import { apiURL, AuthContext } from './App';
import { Form, FormGroup, FormFeedback, FormText, Button, Card, CardBody, CardGroup, CardText, CardTitle, Container, Input, Label } from 'reactstrap';


export default function Registro () {

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
        login: false
    });

    const { setAuthenticated } = useContext(AuthContext);

    function fadeOut(element, velocidad) {
        var variacion = velocidad/100;
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= variacion){
                clearInterval(timer);
                element.style.opacity = 0;
                element.style.filter = 'alpha(opacity=' + 0 + ")";
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * variacion;
        }, 10);
    }
      
    function fadeIn(element, velocidad) {
        var variacion = velocidad/100;
        var op = variacion;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
                element.style.opacity = 1;
                element.style.filter = 'alpha(opacity=' + 1 * 100 + ")";
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * variacion;
        }, 10);
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

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

        let registro_OK = false;

        const dataRegistro = new FormData(event.target);
        await fetch(apiURL + '/registro', {
            method: 'POST',
            credentials: 'include',
            body: dataRegistro
        }).then((response) => {
            return response.text()
        })
        .then(async (result) => {
            let arrayResult = result.split("|");

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
                
                document.getElementsByClassName("loaderTexto")[0].innerHTML  = "Registrando...";

                fadeIn(document.getElementsByClassName("loaderCaja")[0],5);
                fadeIn(document.getElementsByClassName("loaderDiv")[0],20);

                setState({
                    invalid: false
                });

                registro_OK = true;

                await timeout(2000);
            }
        });

        if (registro_OK) {

            document.getElementsByClassName("loaderTexto")[0].innerHTML  = "¡Registrado!<br><br>Iniciando sesión...";

            const dataLogin = new FormData();
            dataLogin.append('username', event.target.elements.email.value);
            dataLogin.append('password', event.target.elements.contrasena.value);
            await fetch(apiURL + '/login', {
                method: 'POST',
                credentials: 'include',
                body: dataLogin
            }).then(async (response) => {
    
                await timeout(2000);
                
                fadeOut(document.getElementsByClassName("loaderCaja")[0],20);
                fadeOut(document.getElementsByClassName("loaderDiv")[0],5);
    
                if (response.status===200) {
                    setAuthenticated(true);
                    setState({
                        login: true
                    });
                } else {
                    setAuthenticated(false);
                }
            });
        }
    }

    if (state.login) {
        return ( <Redirect to='/' /> )
    } else {
        return(

            <div id="CuadroRegistro">

                <div id="cabecera"><h1 className="titulo"><b>TuComunidad</b></h1></div>

                <p style={{textAlign: "center", marginTop:"2%"}}><h3 className="info"><b>Datos de nuevo usuario</b></h3></p>
                <div id="cuadro">
                    <div id="datos">
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