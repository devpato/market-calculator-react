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
            data={products}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        onAddProduct(newData);
                        resolve();
                        setProducts((prevState) => {
                            const data = [...prevState];
                            data.push(newData);
                            return [...data];
                        })
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (oldData) {
                            const prod = newData;
                            delete prod.tableData;
                            onUpdateProduct({ id: newData.id, ...prod });
                            resolve();
                            setProducts((prevState) => {
                                const data = [...prevState];
                                const id = oldData.tableData.id;
                                data[id] = newData;
                                return data;
                            });
                        }
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        console.log(oldData);
                        onRemoveProduct(oldData.id);
                        resolve();
                        setProducts((prevState) => {
                            const data = [...prevState];
                            data.splice(oldData.tableData.id, 1);
                            return data
                        });
                    }),
            }}
        />
    );
}

export default ProductsTable;

