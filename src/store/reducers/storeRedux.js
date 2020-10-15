// redux que tiene la informacion de la aplicacion
import * as actionTypes from '../actions/actionTypes.js'

// uso del localstorage para no perder informacion en caso de salir de la aplicacion
const initialState = {
    dataTerminated: localStorage.getItem("dataTerminated") !== null ? JSON.parse(localStorage.getItem("dataTerminated")) : [],
    dataInitial: localStorage.getItem("dataInitial") !== null ? JSON.parse(localStorage.getItem("dataInitial")) : []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        // se adiciona la informacion aleatoria en el redux y en el localstorage
        case actionTypes.CREATE_DATA:
            localStorage.clear();
            localStorage.setItem("dataTerminated", JSON.stringify(action.data))
            localStorage.setItem("dataInitial", JSON.stringify(state.dataInitial))
            return {
                ...state,
                dataTerminated:action.data
            }
        // se adiciona la informacion creada por el usuario al redux y al local storage
        case actionTypes.ADD_DATA:
            localStorage.clear();
            localStorage.setItem("dataTerminated", JSON.stringify(state.dataTerminated))
            localStorage.setItem("dataInitial", JSON.stringify(action.data))
            return {
                ...state,
                dataInitial:action.data
            }
        // se limpia la informacion de la informacion creada por el usuario
        case actionTypes.CLEAR_INITIAL_DATA:
            return {
                ...state,
                dataInitial: []
            }
        // se limpia toda la informacion del redux y del localstore
        case actionTypes.CLEAR_ALL_DATA:
            localStorage.clear();
            return {
                ...state,
                dataInitial: [],
                dataTerminated: []
            }
        default:
            return state
    }
}

export default reducer;