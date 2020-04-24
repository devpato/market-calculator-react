import * as actionTypes from './actionTypes';
const BASE_PRODUCTS_URL = "https://market-calculator-20bb3.firebaseio.com/";
export const onLoadSuccessProducts = (products) => {
    return {
        type: actionTypes.LOAD_SUCCESS_PRODUCTS,
        payload: products
    };
}


export const onAddSuccessProduct = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        payload: product
    };
}

export const onLoadErrorProducts = (error) => {
    return {
        type: actionTypes.ERROR_PRODUCTS,
        payload: error
    };
}

export const onLoadProducts = () => {
    return (dispatch, getState) => {
        fetch(BASE_PRODUCTS_URL + 'products.json')
            .then(response => response.json())
            .then(res => {
                dispatch(onLoadSuccessProducts(res));
            }).catch(err => {
                dispatch(onLoadErrorProducts(err));
            });
    };
}

export const addProduct = (product) => {
    return (dispatch, getState) => {
        dispatch(onAddSuccessProduct(product));
        // fetch(BASE_PRODUCTS_URL + 'products.json', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(product)
        // })
        //     .then(response => response.json())
        //     .then(res => {
        //         dispatch(onAddSuccessProduct(product));
        //     }).catch(err => {
        //         dispatch(onLoadErrorProducts(err));
        //     });
    };
}