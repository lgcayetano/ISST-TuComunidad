import './Comunicados.css'
export default function Registro () {
    
    return(
        <div>
            <div id="cabecera">
                <p>
                    <b style={{position:'absolute', color:"red", top:"2%", left:"2%"}}> Nombre de comunidad</b>
                    <b style={{position:'absolute', color:"red", top:"2%", right:"2%"}}>Usuario</b>
                    <h1 style={{textAlign: "center", color:"blue"}}><b>TuComunidad</b></h1>
                    
                </p>
            </div>
            <div className="cuerpo">
                <div className="paginausuario" style={{top:"10%"}}><b className="pagina">Comunicados</b></div>
                <div className="otrapaginausuario" style={{top:"40%"}}> <b className="pagina">Votaciones</b></div>
                <div className="otrapaginausuario" style={{top:"70%"}}><b className="pagina">Enviar sugerencias</b></div>
                <div className="otrapaginaadmin" style={{top:"10%"}}><b className="pagina">Publicar comunicados</b></div>
                <div className="otrapaginaadmin"style={{top:"40%"}}><b className="pagina">Publicar votaciones</b></div>
                <div className="otrapaginaadmin"style={{top:"70%"}}><b className="pagina">Gestión comunidad</b></div>
                <div className="comunicados" >
                    <b style={{size:"50"}}>Titulo comunicado</b> Fecha
                    <p>MuchotextoMuchotextoMuch otextoMuchotextoMuchotexto MuchotextoMuchotex toMuchotextoMuchotextoMuchote xtoMuchot extoMuchotextoMuchotextoMucho textoMuchotextoMuchot extoMuchotexto MuchotextoMuchotextoM uchotexto</p>
                </div>
            </div>
            




            <div id="footer" >
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )    

}