import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUser, createGame, getCategories } from "../../actions";
import Swal from 'sweetalert2';
import './home.css';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_categoria: 1,
            nombre_categoria: '',
            puntos: 0,
            preguntas: [],
            pregunta_filtrada: {},
            interrogante: '',
            opc1: '',
            opc2: '',
            opc3: '',
            opc4: '',
            respuesta: '',
            seleccion: '',
            id_usuario: 0,
            ronda: 1, 
            puntuacion: 0, 
            retiro: false, 
            expulsion: false,
        };
        
    }

    handleSubmit (event) {

        event.preventDefault();
        this.setState({
            ...this.state,
            seleccion: event.target.value,
        })
    }

    async componentDidMount() {

        await this.props.getCategories(1);
        let indiceAleatorio = Math.round((Math.random() * (this.props.categoria.pregunta.length - 1)));
        this.setState({
            ...this.state, 
            id_categoria: this.props.categoria.id,
            nombre_categoria: this.props.categoria.nombre,
            puntos: this.props.categoria.puntos, 
            preguntas: this.props.categoria.pregunta,
            pregunta_filtrada: this.props.categoria.pregunta[indiceAleatorio],
            interrogante: this.props.categoria.pregunta[indiceAleatorio].interrogante,
            opc1: this.props.categoria.pregunta[indiceAleatorio].opc1,
            opc2: this.props.categoria.pregunta[indiceAleatorio].opc2,
            opc3: this.props.categoria.pregunta[indiceAleatorio].opc3,
            opc4: this.props.categoria.pregunta[indiceAleatorio].opc4,
            respuesta: this.props.categoria.pregunta[indiceAleatorio].respuesta,
            id_usuario: this.props.usuario.id
        });
    }

    async siguienteCategoria() {

        this.setState({
            ...this.state,
            id_categoria: this.state.id_categoria++,
            puntuacion: this.state.puntuacion + this.props.categoria.puntos
        })
        console.log(this.state.id_categoria)
        await this.props.getCategories(this.state.id_categoria);
    }

    async ultimaPalabra(e) {

        e.preventDefault();
        if(this.state.seleccion === this.state.respuesta){

            if(this.state.id_categoria < 5){

                Swal.fire({
                    icon: 'success',
                    title: '¡Excelente!',
                    text: 'Has respondido correctamente esta pregunta. ¡Prepárate para la siguiente!',
                })
    
                await this.siguienteCategoria();
                let indiceAleatorio = Math.round((Math.random() * (this.props.categoria.pregunta.length - 1)));
    
                this.setState({
                    ...this.state,
                    id_categoria: this.props.categoria.id,
                    nombre_categoria: this.props.categoria.nombre,
                    puntos: this.props.categoria.puntos, 
                    preguntas: this.props.categoria.pregunta,
                    pregunta_filtrada: this.props.categoria.pregunta[indiceAleatorio],
                    interrogante: this.props.categoria.pregunta[indiceAleatorio].interrogante,
                    opc1: this.props.categoria.pregunta[indiceAleatorio].opc1,
                    opc2: this.props.categoria.pregunta[indiceAleatorio].opc2,
                    opc3: this.props.categoria.pregunta[indiceAleatorio].opc3,
                    opc4: this.props.categoria.pregunta[indiceAleatorio].opc4,
                    respuesta: this.props.categoria.pregunta[indiceAleatorio].respuesta,
                    ronda: this.props.categoria.id,
                    seleccion: ''
                });
                console.log(this.state);
            }else if(this.state.id_categoria === 5){

                Swal.fire({
                    icon: 'success',
                    title: '¡Juego Ganado!',
                    text: '¡Felicitaciones! Eres un crack de cracks. ¡Estás list@ para ingresar a las ligas de entrenamiento de Sofka!',
                })

                this.setState({
                    ...this.state,
                    ronda: this.props.categoria.id,
                    retiro: true,
                    puntuacion: this.state.puntuacion + this.props.categoria.puntos
                })
                
                await this.finalJuego();
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Has respondido erróneamente esta pregunta... Fin del juego :(',
            })

            this.setState({
                ...this.state,
                expulsion: true,
                ronda: this.props.categoria.id
            })

            await this.finalJuego();
        }
    }

    async finalJuego(){

        if(this.state.id_categoria === 5){
            await this.props.createGame(this.state.ronda, this.state.puntuacion + this.state.puntos, this.state.retiro, this.state.expulsion, this.state.id_usuario);
        }else{
            await this.props.createGame(this.state.ronda, this.state.puntuacion, this.state.retiro, this.state.expulsion, this.state.id_usuario);
        }
        
        await this.props.getUser(this.props.usuario.nombre);
        console.log(this.props.usuario);
    }

    async retirada(e){

        e.preventDefault();

        Swal.fire({
            title: '¿Está seguro que desea retirarse?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Segurísimo',
            denyButtonText: `Mejor no`,
            cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                    this.setState({
                        ...this.state,
                        retiro: true,
                        ronda: this.props.categoria.id
                    })

                    await this.finalJuego();

                    Swal.fire({
                        icon: 'warning',
                        title: 'Retiro realizado con éxito',
                        text: 'Tu puntuación final fue de: '+(this.state.puntuacion).toString()+' puntos. ¡Seguro en la próxima ocasión te irá mucho mejor!',
                    })

                } else if (result.isDenied) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Sigues en juego!',
                        text: 'Síguelo intentando, ¡no está tan difícil!',
                    })
                }
            })
    }

    render() {
        const { id_categoria, nombre_categoria, interrogante, opc1, opc2, opc3, opc4, seleccion, expulsion, retiro} = this.state;
        return (
            <div className="contenedor_general">
                {expulsion === false && retiro === false ? (
                    <div>
                        <div className="contenedor_enunciados">
                            <h1>¿Quién quiere ser Sofkiano?</h1>
                            <h2>{nombre_categoria}</h2>
                            <h3>{interrogante}</h3>
                        </div>
                        <div className="contenedor_respuestas">
                            <button type="button" id="opcion_a" value={opc1} onClick={(e) => this.handleSubmit(e)} className={seleccion === opc1 ? "boton_seleccionado" : "boton_default"}>{opc1}</button>
                            <button type="button" id="opcion_b" value={opc2} onClick={(e) => this.handleSubmit(e)} className={seleccion === opc2 ? "boton_seleccionado" : "boton_default"}>{opc2}</button>
                            <button type="button" id="opcion_c" value={opc3} onClick={(e) => this.handleSubmit(e)} className={seleccion === opc3 ? "boton_seleccionado" : "boton_default"}>{opc3}</button>
                            <button type="button" id="opcion_d" value={opc4} onClick={(e) => this.handleSubmit(e)} className={seleccion === opc4 ? "boton_seleccionado" : "boton_default"}>{opc4}</button>
                            {seleccion ? (
                                <button type="button" onClick={(e) => this.ultimaPalabra(e)} className="boton_ultima_palabra">¿Última Palabra?</button>
                            ) : null}
                            {id_categoria > 1 ? (
                                <button type="button" onClick={(e) => this.retirada(e)} className="boton_retirada">Retirarse</button>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <NavLink to={`/landingPage`}>
                        <button className="boton_ultima_palabra">Volver a la página de Inicio</button>
                    </NavLink>
                )}
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
        getCategories: (id) => dispatch(getCategories(id)),
        createGame: (ronda, puntuacion, retiro, expulsion, id, id_usuario) => dispatch(createGame(ronda, puntuacion, retiro, expulsion, id, id_usuario))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);