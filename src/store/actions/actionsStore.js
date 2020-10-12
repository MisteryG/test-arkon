import * as actionTypes from './actionTypes.js'
import axios from 'axios'

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

export const findData = (findPokemon) => {
    return (dispatch) => {
        axios.get('https://pokeapi.co/api/v2/pokemon/'+findPokemon)
            .then (response=>{
                dispatch(loadPokemon(response))
            })
            .catch (error=>{
                dispatch(errorConsult(error))
            })
    }
}