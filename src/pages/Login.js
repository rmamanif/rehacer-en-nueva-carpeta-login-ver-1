import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:8050/api";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            correo: '',
            password: ''
        },
        respuesta:{
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.post(baseUrl+"/usuarios/login/", {correo: this.state.form.correo, password: this.state.form.password})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response){
                let respuesta=response;
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido', respuesta.apellido, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('correo', respuesta.correo, {path: "/"});
                cookies.set('telefono', respuesta.telefono, {path:"/"});
                cookies.set('celular',respuesta.celular,{path:"/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido}`);
                alert(cookies.get('id')+cookies.get('nombre'));
                window.location.href="./menu";
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('correo')){
            window.location.href="./menu";
        }
    }
    

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="correo"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;