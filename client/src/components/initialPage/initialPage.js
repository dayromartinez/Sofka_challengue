import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUser, createUser, getCategories } from "../../actions";
import Swal from 'sweetalert2';
import './initialPage.css';

export class InitialPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            password: '',
            match: false
        };
        
    }
    
    async register(e){

        e.preventDefault();
        let datos;

        const { value: formValues } = await Swal.fire({
            title: 'Registro nuevo usuario',
            html:
                '<p>Nombre Usuario: </p>' +
                '<input id="swal-input1" required="true" class="swal2-input">' +
                '<p>Contraseña: </p>' +
                '<input type="password" required="true" id="swal-input2" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })
            
        if (formValues) {
            datos = formValues;
            console.log(datos);
            await this.props.createUser(datos[0], datos[1]);
            if(this.props.usuario.nombre){
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro Exitoso!',
                    text: 'Usuario creado exitosamente. ¡Ahora loguéate!',
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '¡Usuario ya registrado!',
                    text: ''+this.props.usuario.error,
                })
            }
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    async handleSubmit (event) {

        event.preventDefault();
        let nombre = this.state.nombre;

        const login = async(nombre) => {
            await this.props.getUser(nombre);
            if(this.props.usuario.nombre){
                if(this.props.usuario.password === this.state.password){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Logueado!',
                        text: '¡Bienvenido '+this.props.usuario.nombre+'!',
                    })
                    this.setState({ match: true});
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Contraseña incorrecta. Inténtelo nuevamente.',
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: ''+this.props.usuario.error,
                })
            }
            this.setState({ nombre: "", password: ""});
        }
        await login(nombre);
    }

    componentDidMount() {
        this.props.getCategories(1);
    }

    render() {
        const { nombre, password } = this.state;
        return (
            <div>
                <h1>¡BIENVENIDO A QUIÉN QUIERE SER SOFKIANO!</h1>
                <h2>Iniciar Sesión</h2>
                <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                    <label className="label" htmlFor="nombre">Nombre: </label>
                    <input
                        type="text"
                        id="nombre"
                        required={true}
                        autoComplete="off"
                        value={nombre}
                        onChange={(e) => this.handleChange(e)}
                    />
                    </div>
                    <div>
                    <label className="label" htmlFor="password">Contraseña: </label>
                    <input
                        type="password"
                        id="password"
                        required={true}
                        autoComplete="off"
                        value={password}
                        onChange={(e) => this.handleChange(e)}
                    />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <button type="button" onClick={(e) => this.register(e)}>Crear Usuario Nuevo</button>
                <div>
                    { this.props.usuario.nombre && this.props.categoria.nombre && this.state.match ? (
                        <div>
                            <NavLink to={`/sofka_challengue/home`}>
                                <button>¡Iniciar Juego!</button>
                            </NavLink>
                            <NavLink to={`/sofka_challengue/detalles_usuario`}>
                                <button>Perfil Usuario</button>
                            </NavLink>
                        </div>
                    ) : null
                    }
                </div>
                <div>
                    {this.props.categoria.error ? (
                        <NavLink to={`/sofka_challengue/crear_cuestionario`}>
                            <button>Crear Cuestionario</button>
                        </NavLink>
                    ) : null}
                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        usuario: state.usuario,
        categoria: state.categoria
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (user) => dispatch(getUser(user)),
        createUser: (newUser, password) => dispatch(createUser(newUser, password)),
        getCategories: (id) => dispatch(getCategories(id))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);