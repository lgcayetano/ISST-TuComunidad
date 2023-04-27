import './EnviarSugenrecias.css';
import { Redirect } from 'react-router-dom';
import { apiURL} from './App';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Header from './Header';

export default function EnviarSugerencias(){

const [state,setState]= useState({text:'', text_invalid:false, enviado: false,  usuario: '', comunidad: '', presidente: false})

useEffect(()=>{
    
})

}