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
        case actionTypes.ERROR_PRODUCTS:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.ADD_PRODUCT: {
            const products = [...state.products];
            products.push(action.payload);
            return {
                products,
                error: null
            }
        }

        default:
            return state
    }
}

export default reducer;