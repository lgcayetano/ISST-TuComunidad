import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import loader from './loader.gif';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div className='loaderDiv' style={{position:'fixed', top:'0', left:'0', width:'100%', height:'100%', background:'white'}}>
      <div className='loaderCaja' style={{position:'absolute', top:'50%', marginTop:'-10%', textAlign:'center', width:'100%', height:'200px'}}>
        <img src={loader} style={{width:'100px'}}/>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
