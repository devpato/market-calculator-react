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

        case actionTypes.REMOVE_PRODUCT: {
            const products = [...state.products];
            const index = products.findIndex(p => p.id === action.payload);
            products.splice(index, 1);
            return {
                products,
                error: null
            }
        }

        case actionTypes.UPDATE_PRODUCT: {
            const updatedProduct = action.payload;
            const products = [...state.products];
            const index = products.findIndex(p => p.id === action.payload.id);
            products[index] = updatedProduct;
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