import * as actionTypes from './actionTypes.js'

export const loadData = (data) => {
    return {
        type:actionTypes.FIND_DATA,
        data
    }
}

export const errorConsult = (error) => {
    return {
        type:actionTypes.ERROR_CONSULTA,
        error
    }
}

export const addData = (data) => {
    return {
        type:actionTypes.ADD_DATA,
        data
    }
}

export const clearData = () => {
    return {
        type:actionTypes.CLEAR_DATA
    }
}

export const clearInitialData = () => {
    return {
        type:actionTypes.CLEAR_INITIAL_DATA
    }
}

export const createData = (data) => {
    return {
        type:actionTypes.CREATE_DATA,
        data
    }
}