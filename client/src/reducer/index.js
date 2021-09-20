import { GET_USER, CREATE_USER, GET_CATEGORIES, CREATE_CATEGORIE, CREATE_QUESTION, CREATE_GAME } from '../actions/index.js';


const initialState = {
    usuario: {},
    categoria: {},
};

//Se establecen las funcionalidaes de cada una de las acciones en este reducer
const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_USER:
            return {
                ...state,
                usuario: action.payload
            };
        
        case CREATE_USER:
            return {
                ...state,
                usuario: action.payload
            };
        
        case GET_CATEGORIES:
            return {
                ...state,
                categoria: action.payload
            };
        
        case CREATE_CATEGORIE:
            return {
                ...state,
                categoria: action.payload
            };
        
        case CREATE_QUESTION:
            return {
                ...state,
            };
        
        case CREATE_GAME:
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default rootReducer;