import './Comunicados.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
export default function Comunicados () {
    
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
                    <p><b style={{size:"50"}}>Nuevo comunicado</b> </p>
                    <textarea  type="text" name="Nuevo Comunicado" id="nuevocomunicado" 
                    style={{height:"300px", width:"100%"}} />
                     <Button type="submit" style={{marginLeft:"45%"}}>Publicar comunicado</Button>
                   
                </div>
            </div>
            




            <div className="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}