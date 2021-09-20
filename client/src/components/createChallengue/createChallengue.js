import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getCategories, createCategorie, createQuestion } from "../../actions";
import Swal from 'sweetalert2';
import './createChallengue.css';

export class CreateChallengue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_categoria: 1,
            c_categoria: 0,
            c_preguntas: 0,
            interrogante: '',
            opc1: '',
            opc2: '',
            opc3: '',
            opc4: '',
            respuesta: ''
        };
        
    }

    handleChange(e) {
        console.log(e.target.id, e.target.value)
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    async handleSubmit (event) {

        event.preventDefault();
        
        if(this.state.c_preguntas < 5){

            await this.props.createQuestion(this.state.interrogante, this.state.id_categoria, this.state.opc1, this.state.opc2, this.state.opc3, this.state.opc4, this.state.respuesta);
            await this.props.getCategories(this.state.id_categoria);

            if(this.state.c_preguntas < 4){

                if(this.props.categoria.pregunta[this.state.c_preguntas]){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Pregunta creada con éxito!',
                        text: 'Faltan '+ (5 - (this.state.c_preguntas + 1)).toString() +' preguntas por registrar para '+this.props.categoria.nombre+'.',
                    })
                }
                this.setState({
                    ...this.state,
                    c_preguntas: this.state.c_preguntas + 1,
                    interrogante: '',
                    opc1: '',
                    opc2: '',
                    opc3: '',
                    opc4: '',
                    respuesta: ''
                });
                console.log(this.state.c_preguntas);
                console.log(this.state.id_categoria);

            }else if(this.state.c_preguntas === 4){

                Swal.fire({
                    icon: 'success',
                    title: '¡Pregunta creada con éxito!',
                    text: 'Todas las preguntas para '+this.props.categoria.nombre+' han sido registradas satisfactoriamente :)',
                })

                this.setState({
                    ...this.state,
                    c_preguntas: 0,
                    id_categoria: this.state.id_categoria + 1,
                    interrogante: '',
                    opc1: '',
                    opc2: '',
                    opc3: '',
                    opc4: '',
                    respuesta: ''
                });
                console.log(this.state.c_preguntas);
                console.log(this.state.id_categoria);
                if(this.state.id_categoria === 6){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Cuestionario creado con éxito!',
                        text: 'Todas las preguntas con su respectiva categotía han sido creadas satisfactoriamente. ¡Ahora ve a la página de inicio y loguéate para empezar con la diversión!',
                    })
                }
            }
        }
    }

    async crearCategoria(e) {

        e.preventDefault();
        let datos;

        const { value: formValues } = await Swal.fire({
            title: 'Crear Categoría',
            html:
                '<p>Nombre Categoría: </p>' +
                '<input required="true" id="swal-input11" class="swal2-input">' +
                '<p>Puntos de premio de esta categoría: </p>' +
                '<input required="true" id="swal-input22" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input11').value,
                    document.getElementById('swal-input22').value
                ]
            }
        })
            
        if (formValues) {
            datos = formValues;
            console.log(this.state.id_categoria, datos[0], Number(datos[1]));
            await this.props.createCategorie(this.state.id_categoria, datos[0], Number(datos[1]));
            if(this.props.categoria.id){
                Swal.fire({
                    icon: 'success',
                    title: '¡Categoría creada!',
                    text: 'Ahora registra las 5 preguntas para esta categoría',
                })
                this.setState({
                    ...this.state,
                    c_categoria: this.state.id_categoria
                });
            }
        }
    }

    render() {
        const { id_categoria, c_categoria, c_preguntas, interrogante, opc1, opc2, opc3, opc4, respuesta } = this.state;
        return (
            <div>
                {id_categoria < 6 ? (
                    <div>
                        <h2>Crear Cuestionario</h2>
                        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
                            <div>
                                <h3 className="label" htmlFor="interrogante">Pregunta: </h3>
                                <input
                                    type="text"
                                    id="interrogante"
                                    required={true}
                                    autoComplete="off"
                                    placeholder="Pregunta..."
                                    value={interrogante}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="opc1">{"A)"}</label>
                                <input
                                    type="text"
                                    id="opc1"
                                    required={true}
                                    autoComplete="off"
                                    value={opc1}
                                    placeholder="Opción de respuesta A"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="opc2">{"B)"}</label>
                                <input
                                    type="text"
                                    id="opc2"
                                    required={true}
                                    autoComplete="off"
                                    value={opc2}
                                    placeholder="Opción de respuesta B"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="opc3">{"C)"}</label>
                                <input
                                    type="text"
                                    id="opc3"
                                    required={true}
                                    autoComplete="off"
                                    value={opc3}
                                    placeholder="Opción de respuesta C"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="opc4">{"D)"}</label>
                                <input
                                    type="text"
                                    id="opc4"
                                    required={true}
                                    autoComplete="off"
                                    value={opc4}
                                    placeholder="Opción de respuesta D"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            {interrogante && opc1 && opc2 && opc3 && opc4 ? (
                                <div className="caja_respuesta">
                                <select className="menu_respuesta" required={true} id="respuesta" onChange={(e) => this.handleChange(e)} value={respuesta}>
                                    <option value="Respuesta">Respuesta Pregunta:</option>
                                    <option value={opc1}>A</option>
                                    <option value={opc2}>B</option>
                                    <option value={opc3}>C</option>
                                    <option value={opc4}>D</option>
                                </select>
                            </div>
                            ) : null}
                            {interrogante && opc1 && opc2 && opc3 && opc4 && respuesta ? (
                                <button type="submit">Crear Pregunta</button>
                            ) : null}
                            
                        </form>
                        {c_preguntas === 0 && id_categoria !== c_categoria ? (
                            <button type="button" onClick={(e) => this.crearCategoria(e)}>Crear nueva categoría</button>
                        ) : null}
                    </div>
                ) : (
                    <NavLink to={`/landingPage`}>
                        <button>Página de Inicio</button>
                    </NavLink>
                )}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        categoria: state.categoria
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (id) => dispatch(getCategories(id)),
        createCategorie: (id, nombre, puntos) => dispatch(createCategorie(id, nombre, puntos)),
        createQuestion: (interrogante, id_categoria, opc1, opc2, opc3, opc4, respuesta) => dispatch(createQuestion(interrogante, id_categoria, opc1, opc2, opc3, opc4, respuesta))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengue);