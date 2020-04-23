import * as actionTypes from './actionTypes';
const BASE_PRODUCTS_URL = "https://market-calculator-20bb3.firebaseio.com/";
export const onLoadSuccessProducts = (res) => {
    return {
        type: actionTypes.LOAD_SUCCESS_PRODUCTS,
        payload: res
    };
}

export const onLoadErrorProducts = (error) => {
    return {
        type: actionTypes.LOAD_ERROR_PRODUCTS,
        payload: error
    };
}

export const onLoadProducts = () => {
    return (dispatch, getState) => {
        console.log('actions');
        fetch(BASE_PRODUCTS_URL + 'products.json')
            .then(response => response.json())
            .then(res => {
                dispatch(onLoadSuccessProducts(res));
            }).catch(err => {
                dispatch(onLoadErrorProducts(err));
            });
    };
}