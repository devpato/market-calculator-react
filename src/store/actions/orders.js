import * as actionTypes from './actionTypes';
import db from '../../firebase'
const ORDERS_COLLECTION = db.collection('orders');

export const onLoadSuccessOrders = (orders) => {
    return {
        type: actionTypes.LOAD_SUCCESS_ORDERS,
        payload: orders
    };
}

export const onAddSuccessOrder = (order) => {
    return {
        type: actionTypes.ADD_ORDER,
        payload: order
    };
}

export const onRemoveOrder = (id) => {
    return {
        type: actionTypes.REMOVE_ORDER,
        payload: id
    };
}

export const onUpdateOrder = (orders) => {
    return {
        type: actionTypes.UPDATE_ORDER,
        payload: orders
    };
}

export const onLoadErrorOrders = (error) => {
    return {
        type: actionTypes.REMOVE_ORDERS,
        payload: error
    };
}

export const onLoadOrders = () => {
    return (dispatch, getState) => {
        const orders = [];
        ORDERS_COLLECTION.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            });
            dispatch(onLoadSuccessOrders(orders));
        }).catch(err => {
            dispatch(onLoadErrorOrders(err));
        });
    };
}

export const addOrder = (order) => {
    return (dispatch, getState) => {
        ORDERS_COLLECTION.add(order)
            .then((docRef) => {
                dispatch(onAddSuccessOrder({ ...order, id: docRef.id }));
            })
            .catch(error => {
                dispatch(onLoadErrorOrders(error));
            });
    };
}

export const removeOrder = (id) => {
    return (dispatch, getState) => {
        ORDERS_COLLECTION.doc(id).delete().then(() => {
            dispatch(onRemoveOrder(id));
        }).catch(error => {
            dispatch(onLoadErrorOrders(error));
        });
    };
}

export const udpateOrder = (order) => {
    return (dispatch, getState) => {
        ORDERS_COLLECTION.doc(order.id).set(order).then(() => {
            dispatch(onUpdateOrder(order));
        }).catch(error => {
            dispatch(onLoadErrorOrders(error));
        });
    }
}