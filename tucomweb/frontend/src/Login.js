import React, { useState, useContext  } from 'react';
//import './App.css';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { apiURL, AuthContext } from './App';
import { Form, FormGroup, FormFeedback, FormText, Button, Card, CardBody, CardGroup, CardText, CardTitle, Container, Input, Label } from 'reactstrap';

export default function Login () {

    const [state, setState] = useState({
        username: '', password: '', invalid: false, login: false
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
            invalid: false
        });
    }

    async function handleSubmit(event) {

        //evita que se recarge la pagina al darle al boton acceder (submit)
        event.preventDefault();

        const dataLogin = new FormData(event.target);
        await fetch(apiURL + '/login', {
            method: 'POST',
            credentials: 'include',
            body: dataLogin
        }).then((response) => {

            if (response.status===200) {
                setAuthenticated(true);
                setState({
                    invalid: false,
                    login: true
                });
            } else {
                setAuthenticated(false);
                setState({
                    invalid: true
                });
            }
        });
    }

    if (state.login) {
        return ( <Redirect to='/' /> )
    } else {
        return (
            <div className='background'>
                <h1 className='titulo'><b>TuComunidad</b></h1>

                    <CardGroup className='body'>
                        <Card>
                            <CardTitle>
                                <h1>Acceso de usuario</h1>
                            </CardTitle>
                            <CardBody>
                                {/*
                                <h3>email</h3>
                                <Input size={1}></Input>
                                <h3>constraseña</h3>
                                <Input maxLength={7} ></Input>
                                <Button>Boton para entrar</Button>
                                */}

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="username">Email</Label>
                                        <Input type="email" name="username" id="username" value={state.username}
                                            onChange={handleChange} invalid={state.invalid}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Contraseña</Label>
                                        <Input type="password" name="password" id="password" value={state.password}
                                            onChange={handleChange} invalid={state.invalid}/>
                                        <FormFeedback invalid={state.invalid}>Email y/o contraseña incorrectos.</FormFeedback>
                                    </FormGroup>
                                    <FormGroup style={{marginTop:"20px"}}>
                                        <Button type="submit">Iniciar sesión</Button>
                                    </FormGroup>
                                </Form>

                            </CardBody>
                        </Card>
                        <Card>
                            <CardTitle style={{marginTop:"30px"}}><h3>Si no está registrado</h3></CardTitle>
                            <CardBody>
                                <Link to="/registro">
                                    <Button size='lg'>Regístrese</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </CardGroup>

                <footer className='footer'><b>TuComunidad 2023</b></footer>
            </div>

        );
    }
}