import React, { useState, useCallback } from "react";
import * as actionCreators from '../../../../store/actions/index';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';


const ProductsTable = ({ data }) => {

    const dispatch = useDispatch();
    const onAddProduct = useCallback((product) => dispatch(actionCreators.addProduct(product)), [dispatch]);
    const onRemoveProduct = useCallback((id) => dispatch(actionCreators.removeProduct(id)), [dispatch]);
    const onUpdateProduct = useCallback((product) => dispatch(actionCreators.udpateProduct(product)), [dispatch]);

    const columns = [
        { title: 'Nombre', field: 'nombre', type: 'string' },
        { title: 'Precio', field: 'precio', type: 'numeric' },
        { title: 'Unidad', field: 'unidad', type: 'string' },
    ];
    const [products, setProducts] = useState(data);
    return (
        <MaterialTable
            title="Productos"
            columns={columns}
            data={data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        delete newData.tableData;
                        console.log(newData);
                        onAddProduct(newData);
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (oldData) {
                            const prod = newData;
                            onUpdateProduct({ id: prod.id, ...prod });
                            resolve();
                        }
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        onRemoveProduct(oldData.id);
                        reject();
                    }),
            }}
        />
    );
}

export default ProductsTable;

