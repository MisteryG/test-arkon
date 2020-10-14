import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
    dataModal: {},
    dataTerminated: [],
    dataInitial: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_DATA:
            return {
                ...state,
                dataTerminated:action.data
            }
        case actionTypes.ADD_DATA:
            return {
                ...state,
                dataInitial:action.data
            }
        case actionTypes.CLEAR_DATA:
            return {
                ...state,
                dataModal:{}
            }
        case actionTypes.CLEAR_INITIAL_DATA:
            return {
                ...state,
                dataInitial: []
            }
        default:
            return state
    }
}

export default reducer;