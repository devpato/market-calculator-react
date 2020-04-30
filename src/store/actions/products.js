import * as actionTypes from './actionTypes';
import db from '../../firebase'
const PRODUCTS_COLLECTION = db.collection('products');

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
        PRODUCTS_COLLECTION.get().then((querySnapshot) => {
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
        PRODUCTS_COLLECTION.add(product)
            .then((docRef) => {
                dispatch(onAddSuccessProduct({ ...product, id: docRef.id }));
            })
            .catch(error => {
                dispatch(onLoadErrorProducts(error));
            });
    };
}

export const removeProduct = (id) => {
    return (dispatch, getState) => {
        PRODUCTS_COLLECTION.doc(id).delete().then(() => {
            dispatch(onRemoveProduct(id));
        }).catch(error => {
            dispatch(onLoadErrorProducts(error));
        });
    };
}

export const udpateProduct = (product) => {
    return (dispatch, getState) => {
        PRODUCTS_COLLECTION.doc(product.id).set(product).then(() => {
            dispatch(onUpdateProduct(product));
        }).catch(error => {
            dispatch(onLoadErrorProducts(error));
        });
    }
}