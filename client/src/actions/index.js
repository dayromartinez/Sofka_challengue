export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CREATE_CATEGORIE = "CREATE_CATEGORIE";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const CREATE_GAME = "CREATE_GAME";

//Obtencion de usuario por defecto, por nombre de usuario
export function getUser(nombre) {
    return async function(dispatch) {
        return await fetch(`http://localhost:3001/usuarios?nombre=${nombre}`)
            .then(response => response.json())
            .then(json => { 
                console.log(json)
                dispatch({ type: GET_USER, payload: json })
            })
            .catch(error => console.log(error));
    };
}

//Creación de usuario
export function createUser(nombre, password) {
    return async function(dispatch) {
        let response = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            body: JSON.stringify({nombre, password}),
            headers: {'Content-Type': 'application/json'}
        })
        let json = await response.json();   
        dispatch({ type: CREATE_USER, payload: json })
    };
}

//Consulta de categorias
export function getCategories(id) {
    return async function(dispatch) {
        return await fetch(`http://localhost:3001/categorias?id=${id}`)
            .then(response => response.json())
            .then(json => { 
                dispatch({ type: GET_CATEGORIES, payload: json })
            })
            .catch(error => console.log(error));
    };
}

//Creación de categoria
export function createCategorie(id, nombre, puntos) {
    return async function(dispatch) {
        let response = await fetch('http://localhost:3001/categorias', {
            method: 'POST',
            body: JSON.stringify({id, nombre, puntos}),
            headers: {'Content-Type': 'application/json'}
        })
        let json = await response.json();   
        dispatch({ type: CREATE_CATEGORIE, payload: json })
    };
}

//Creación de pregunta
export function createQuestion(interrogante, id_categoria, opc1, opc2, opc3, opc4, respuesta) {
    return async function(dispatch) {
        let response = await fetch('http://localhost:3001/preguntas', {
            method: 'POST',
            body: JSON.stringify({interrogante, id_categoria, opc1, opc2, opc3, opc4, respuesta}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json();    
        dispatch({ type: CREATE_QUESTION, payload: json })
    };
}

//Creación de historial de juego
export function createGame(ronda, puntuacion, retiro, expulsion, id_usuario) {
    return async function(dispatch) {
        let response = await fetch('http://localhost:3001/juegos', {
            method: 'POST',
            body: JSON.stringify({ronda, puntuacion, retiro, expulsion, id_usuario}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json();    
        dispatch({ type: CREATE_GAME, payload: json })
    };
}

