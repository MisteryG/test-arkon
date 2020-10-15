// aqui se encuentran las funciones para actualizacion del redux
import * as actionTypes from './actionTypes.js'
// funcion para crear datos de usuario
export const addData = (data) => {
    return {
        type:actionTypes.ADD_DATA,
        data
    }
}
// funcion para limpiar todos los datos del redux
export const clearAllData = () => {
    return {
        type:actionTypes.CLEAR_ALL_DATA
    }
}
// funcion para limpiar datos que ingreso el usuario
export const clearInitialData = () => {
    return {
        type:actionTypes.CLEAR_INITIAL_DATA
    }
}
// funcion para almacenar los datos aleatorios en redux
export const createData = (data) => {
    return {
        type:actionTypes.CREATE_DATA,
        data
    }
}