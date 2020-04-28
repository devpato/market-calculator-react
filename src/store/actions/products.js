import * as actionTypes from './actionTypes';
import db from '../../firebase'
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

export const onRemoveProduct = (id) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        payload: id
    };
}

export const onUpdateProduct = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT,
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
        const products = [];
        db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() })
            });
            dispatch(onLoadSuccessProducts(products));
        }).catch(err => {
            dispatch(onLoadErrorProducts(err));
        });
    };
}

export const addProduct = (product) => {
    return (dispatch, getState) => {
        db.collection("products").add(product)
            .then(function (docRef) {
                dispatch(onAddSuccessProduct({ ...product, id: docRef.id }));
            })
            .catch(function (error) {
                dispatch(onLoadErrorProducts(error));
            });
    };
}

export const removeProduct = (id) => {
    return (dispatch, getState) => {
        dispatch(onRemoveProduct(id));
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

export const udpateProduct = (product) => {
    return (dispatch, getState) => {
        dispatch(onUpdateProduct(product));
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