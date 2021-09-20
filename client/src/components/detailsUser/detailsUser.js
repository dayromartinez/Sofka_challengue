import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUser } from "../../actions";
import './detailsUser.css';

export class InitialPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            juegos: [],
        };
        
    }

    componentDidMount() {
        this.setState({ 
            nombre: this.props.usuario.nombre,
            juegos: this.props.usuario.juegos
        })
    }
    render() {
        const { nombre, juegos } = this.state;
        return (
            <div className="contenedor_detalles_usuario">
                <h2>{"Historial de juegos de "+nombre}</h2>
                {juegos.map((juego, indice) => {
                    return (
                        <div className="contenedor_juego">
                            <h3>{"Juego "+(indice + 1).toString()}</h3>
                            <label className="detail_juego">Ronda: <label className="detail_dato">{juego.ronda}</label></label>
                            <p className="detail_juego">Puntuación: <label className="detail_dato">{juego.puntuacion}</label></p>
                        </div>
                    )
                })}
                <NavLink to={`/landingPage`}>
                    <button className="inicio_boton">Inicio</button>
                </NavLink>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        usuario: state.usuario
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (user) => dispatch(getUser(user))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);