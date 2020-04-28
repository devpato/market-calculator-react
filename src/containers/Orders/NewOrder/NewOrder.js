import React, { useState, useEffect, useCallback } from 'react';
import NewOrderForm from '../../../components/UI/Forms/NewOrderForm';
import NewOrdersTable from '../../../components/UI/Tables/NewOrderTable/NewOrderTable'
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import styles from './NewOrder.module.css';

const NewOrder = (pros) => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);

    const [productsOrders, setProductsOrders] = useState([]);

    useEffect(() => {
        onLoadProducts();
    }, [onLoadProducts]);

    const onAddProductHandler = (product) => {
        setProductsOrders(prevState => {
            const productsOrderedList = [...prevState];
            productsOrderedList.push(getProductTotalCost(product));
            return productsOrderedList;
        });
    }

    const onDeleteProductHandler = (productId) => {
        setProductsOrders((prevState) => {
            const data = [...prevState];
            data.splice(productId, 1);
            return data;
        });
    }

    const onUpdateProductHandler = (updatedProduct, id) => {
        setProductsOrders((prevState) => {
            const data = [...prevState];
            data[id] = getProductTotalCost(updatedProduct);
            return data;
        });
    }

    const getProductTotalCost = (product) => {
        const total = product.precio * product.quantity;
        return { ...product, total };
    }

    return (
        <div className={styles.NewOrder}>
            <NewOrderForm products={products} addProduct={onAddProductHandler} />
            <NewOrdersTable products={productsOrders} deleteProduct={onDeleteProductHandler} updateProduct={onUpdateProductHandler} />
        </div>
    );
}

export default NewOrder;