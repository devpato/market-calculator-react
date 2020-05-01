import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import ProductsTable from '../../components/UI/Tables/ProductsTable/ProductsTable'


const Products = (props) => {

    const products = useSelector(state => state.productsReducer.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);

    useEffect(() => {
        onLoadProducts();
    }, [onLoadProducts]);

    return (
        products.length > 0 ? <ProductsTable data={products} /> : <p>Loading...</p>
    );

}
export default Products;
