import React, { Component } from 'react';
//import './App.css';
import './Home.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Card, CardBody, CardGroup, CardText, CardTitle, Container, Input } from 'reactstrap';


class Home extends Component {
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
                                <h3>email</h3>
                                <Input size={1}></Input>
                                <h3>constraseña</h3>
                                <Input maxLength={7} ></Input>
                                <Button>Boton para entrar</Button>
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