
import React, { useEffect, useCallback } from 'react';
import Products from './containers/Products/Products'
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from './store/actions/index';
import './App.css';

const App = () => {

  const dispatch = useDispatch();
  const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);
  const products = useSelector(state => state.products);

  useEffect(() => {
    onLoadProducts();
  }, [onLoadProducts]);

  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
