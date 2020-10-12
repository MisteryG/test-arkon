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

export const addData = (value) => {
    return {
        type:actionTypes.ADD_DATA,
        value
    }
}

export const clearData = () => {
    return {
        type:actionTypes.CLEAR_DATA
    }
}

export const createData = (data) => {
    return {
        type:actionTypes.CREATE_DATA,
        data
    }
}