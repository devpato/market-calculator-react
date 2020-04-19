
import React from 'react';
import { connect } from 'react-redux';

const products = ({ products, error }) => {
    console.log('prop', products);
    return (
        <h1>Products</h1>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products,
        error: state.error
    }
}

export default connect(mapStateToProps)(products);