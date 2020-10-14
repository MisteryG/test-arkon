import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
    dataModal: {},
    dataTerminated: localStorage.getItem("dataTerminated") !== null ? JSON.parse(localStorage.getItem("dataTerminated")) : [],
    dataInitial: localStorage.getItem("dataInitial") !== null ? JSON.parse(localStorage.getItem("dataInitial")) : []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_DATA:
            localStorage.clear();
            localStorage.setItem("dataTerminated", JSON.stringify(action.data))
            localStorage.setItem("dataInitial", JSON.stringify(state.dataInitial))
            return {
                ...state,
                dataTerminated:action.data
            }
        case actionTypes.ADD_DATA:
            localStorage.clear();
            localStorage.setItem("dataTerminated", JSON.stringify(state.dataTerminated))
            localStorage.setItem("dataInitial", JSON.stringify(action.data))
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