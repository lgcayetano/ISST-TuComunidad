import { useState } from "react";
import './Registro.css'
import { apiURL } from './App';
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
        nombre: '', email: '', contrasena: '', codigoregistro: '', invalid: false, registro: false
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        });

        setState({
            invalid: false
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

            if (response.status===200) {
                setState({
                    invalid: false,
                    registro: true
                });
            } else {
                setState({
                    invalid: true
                });
            }
        });
    }


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
                            onChange={handleChange} invalid={state.invalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email"><b >Email</b></Label>
                        <Input className="innput" type="email" name="email" id="email" value={state.email}
                            onChange={handleChange} invalid={state.invalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contrasena"><b>Contraseña</b></Label>
                        <Input className="innput" type="password" name="contrasena" id="contrasena" value={state.contrasena}
                            onChange={handleChange} invalid={state.invalid}/>
                        <FormFeedback invalid={state.invalid}>Email y/o contraseña incorrectos.</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="codigoregistro"><b>Código de acceso</b></Label>
                        <Input className="innput"type="text" name="codigoregistro" id="codigoregistro" value={state.codigoregistro}
                            onChange={handleChange} invalid={state.invalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" style={{marginLeft:"45%"}}>Registrar</Button>
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