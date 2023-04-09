import { useState } from "react";
import './Registro.css'
export default function Registro () {
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");
    const [query3, setQuery3] = useState("");
    const [query4, setQuery4] = useState("");

    function registrar(text, text2, text3, text4){
        return;
    }


    return(

        <div >

            <div id="cabecera"><h1 style={{textAlign: "center", color:"blue"}}><b>TuComunidad</b></h1></div>

            <p style={{textAlign: "center"}}><h3>Datos de nuevo usuario</h3></p>
            <div id="cuadro">
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

            </div>
            <div id="footer">
                <b>TuComunidad 2023</b>
            </div>
        </div>
    )
}