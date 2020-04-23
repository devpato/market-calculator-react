import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import DataTable from '../components/UI/DataTable'


const Products = () => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);

    const tableHeaders = [
        {
            name: 'Name'
        },
        {
            name: 'Precio'
        },
        {
            name: 'Unidad'
        }
    ]



    useEffect(() => {
        onLoadProducts();
    }, [onLoadProducts]);

    return (
        <DataTable data={products} headers={tableHeaders} />
    );
}

export default Products;