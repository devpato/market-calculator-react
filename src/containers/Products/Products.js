import React from 'react';
import ProductsTable from '../../components/UI/Tables/ProductsTable/ProductsTable'

const Products = ({ products }) => {

    return (
        products.length > 0 ? <ProductsTable data={products} /> : null
    );

}
export default Products;
