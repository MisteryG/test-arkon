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
            console.log("loquellega",action.data)
            return {
                ...state,
                dataInitial:action.data
            }
        case actionTypes.CLEAR_DATA:
            return {
                ...state,
                dataModal:{}
            }
        default:
            return state
    }
}

export default reducer;