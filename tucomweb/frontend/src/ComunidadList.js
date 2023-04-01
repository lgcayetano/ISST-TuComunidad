import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ComunidadList extends Component {

    constructor(props) {
        super(props);
        this.state = {comunidades: []};
    }

    /*
    componentDidMount() {
        fetch('/comunidades')
            .then(response => response.json())
            .then(data => this.setState({comunidades: data}));
    }
    */

    render() {
        const {comunidades} = this.state;

        const comunidadList = comunidades.map(comunidad => {
            return <tr key={comunidad.id}>
                <td style={{whiteSpace: 'nowrap'}}>{comunidad.nombre}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Comunidades</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comunidadList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ComunidadList;