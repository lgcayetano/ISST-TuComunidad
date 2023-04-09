import React, { Component } from 'react';
//import './App.css';
import './Home.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { apiURL } from './App';
import { Form, FormGroup, Button, Card, CardBody, CardGroup, CardText, CardTitle, Container, Input, Label } from 'reactstrap';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {

        event.preventDefault();

        const dataLogin = new FormData(event.target);
        await fetch(apiURL + '/login', {
            method: 'POST',
            credentials: 'include',
            body: dataLogin
        }).then((response) => {
            alert('Login correcto: ' + response);
            console.log(response.headers.get('Location'));
        }).catch((error) => {
            alert('Login incorrecto: ' + error);
        });
    }

    render() {
        return (
            /*
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/comunidades">Comunidades</Link></Button>
                </Container>
            </div>
            */

            <div className='background'>
                <h1 className='title'>TU COMUNIDAD</h1>

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

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="username">Email</Label>
                                        <Input type="email" name="username" id="username" value={this.state.username}
                                            onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Contraseña</Label>
                                        <Input type="password" name="password" id="password" value={this.state.password}
                                            onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit">Iniciar sesión</Button>
                                    </FormGroup>
                                </Form>

                            </CardBody>
                        </Card>
                        <Card>
                            <CardTitle><h3>Si no está registrado</h3></CardTitle>
                            <CardBody>
                                <Link to="/registro">
                                    <Button size='lg'>Registrese</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </CardGroup>

                <footer className='footer'>Tu comunidad</footer>
            </div>
        );
    }
}

export default Home;