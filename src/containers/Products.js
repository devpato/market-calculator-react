import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../store/actions/index';

const Products = props => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);


    useEffect(() => {
        onLoadProducts();
    }, [onLoadProducts]);

    const flag = products.length > 0 ? 'YAY' : 'NAY';

    return (
        <p>{flag}</p>
    )
}

export default Products;