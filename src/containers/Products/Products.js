import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import ProductsTable from '../../components/UI/Tables/ProductsTable/ProductsTable'


const Products = (props) => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);

    useEffect(() => {
        if (products.length === 0) {
            onLoadProducts();
        }
    }, [onLoadProducts, products]);

    return (
        products.length > 0 ? <ProductsTable data={products} /> : null
    );

}
export default Products;
