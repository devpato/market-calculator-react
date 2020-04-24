import React, { useState, useCallback } from "react";
import * as actionCreators from '../../../../store/actions/index';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';


const ProductsTable = ({ data }) => {

    const dispatch = useDispatch();
    const onAddProduct = useCallback((product) => dispatch(actionCreators.addProduct(product)), [dispatch]);

    const columns = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Precio', field: 'precio', type: 'numeric' },
        { title: 'Unidad', field: 'unidad', type: 'numeric' },
    ];
    const [products, setProducts] = useState(data);

    return (
        <>
            <MaterialTable
                title="Products"
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
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setProducts((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setProducts((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
            <button onClick={() => onAddProduct({
                name: 'patoSS', precio: 1, unidad: 2
            }
            )}>Add</button>
        </>
    );
}

export default ProductsTable;

