import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOAD_SUCCESS_ORDERS:
            return {
                orders: action.payload,
                error: null
            }

        case actionTypes.ERROR_ORDERS:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.ADD_ORDER: {
            const orders = [...state.orders];
            orders.push(action.payload);
            return {
                orders,
                error: null
            }
        }

        case actionTypes.REMOVE_ORDER: {
            const orders = [...state.orders];
            orders.splice(action.payload, 1);
            return {
                orders,
                error: null
            }
        }

        case actionTypes.UPDATE_ORDER: {
            const updatedOrder = action.payload.data;
            const orders = [...state.orders];
            const index = action.payload.id;
            orders[index] = updatedOrder;
            return {
                orders,
                error: null
            }
        }

        default:
            return state
    }
}

export default reducer;