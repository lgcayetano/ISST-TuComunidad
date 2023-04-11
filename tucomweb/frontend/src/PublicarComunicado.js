import './Comunicados.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState  } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
export default function PublicarComunicados () {

    const [state, setState] = useState({
        title: '', text: '', invalid: false, publicado: false
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

        const comunicados = new FormData();
            comunicados.append('title', event.target.elements.title.value);
            comunicados.append('text', event.target.elements.text.value);
            await fetch(apiURL + '/comunicados/nuevo', {
                method: 'POST',
                credentials: 'include',
                body: comunicados
            }).then((response) => {

                if (response.status===200) {
                    setState({
                        publicado:true
                    });
                    }
                    else {
                       
                    }
                });
            
    }

    if (state.publicado) {
        return (
            <Redirect to='/' />
        )
    } else {
    return(
        <div>
            <div id="cabecera">
                <p>
                    <b style={{position:'absolute', color:"black", top:"2%", left:"2%"}}> Nombre de comunidad</b>
                    <b style={{position:'absolute', color:"black", top:"2%", right:"2%"}}>Usuario</b>
                    <h1 className="titulo"><b>TuComunidad</b></h1>
                    
                </p>
            </div>
            <div className="cuerpo">
                <Link to="/">
                    <div className="otrapaginausuario" style={{top:"10%", textAlign:"center"}}><b className="pagina">Comunicados</b></div>
                </Link>
                <div className="otrapaginausuario" style={{top:"40%", textAlign:"center"}}> <b className="pagina">Votaciones</b></div>
                <div className="otrapaginausuario" style={{top:"70%", textAlign:"center"}}><b className="pagina">Enviar sugerencias</b></div>
                <div className="paginaadmin" style={{top:"10%", textAlign:"center"}}><b className="pagina">Publicar comunicados</b></div>
                <div className="otrapaginaadmin"style={{top:"40%", textAlign:"center"}}><b className="pagina">Publicar votaciones</b></div>
                <div className="otrapaginaadmin"style={{top:"70%", textAlign:"center"}}><b className="pagina">Gestión comunidad</b></div>
                <div className="comunicados" >
                    <div id="datos">

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Título del nuevo comunicado</Label>
                            <Input type="text" name="title" id="title" value={state.title}
                                    onChange={handleChange} invalid={state.invalid} style={{marginBottom:"20px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Contraseña</Label>
                            <textarea type="text" name="text" id="text" value={state.text}
                                    onChange={handleChange} invalid={state.invalid} />
                        </FormGroup>
                        <FormGroup style={{marginTop:"20px", textAlign:"center"}}>
                            <Button type="submit">Publicar comentario</Button>
                        </FormGroup>
                    </Form>





                        
                    </div>
                </div>
            </div>
            




            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}
}
/*
                        <p><b>Título del nuevo comunicado:</b></p>
                        <Input type="text"  id="titulocomunicado" name="titulocomunicado" 
                        value={state.title} onChange={handleChange} />
                        <p><b>Comunicado a escribir:</b></p>
                        <textarea type="text" name="Nuevo Comunicado" id="nuevocomunicado" style={{height:"300px", width:"100%"}}
                        value={state.text} onChange={handleChange} />
                        <Button type="submit"  style={{marginLeft:"45%", marginTop:"20px"}}>Publicar comunicado</Button>
                         */