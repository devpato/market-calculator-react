import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_SUCCESS_PRODUCTS:
            return {
                products: action.payload,
                error: null
            }
        case actionTypes.LOAD_ERROR_PRODUCTS:
            return {
                products: action.payload,
                error: null
            }
        default:
            return state
    }
}

export default reducer;