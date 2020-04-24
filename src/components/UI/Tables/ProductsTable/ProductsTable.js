import React, { useState } from "react";
import MaterialTable from 'material-table';


const ProductsTable = ({ data }) => {

    const columns = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Precio', field: 'precio', type: 'numeric' },
        { title: 'Unidad', field: 'unidad', type: 'numeric' },
    ];

    const [products, setProducts] = useState(data);

    return (
        <MaterialTable
            title="Products"
            columns={columns}
            data={products}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setProducts((prevState) => {
                                const data = [...prevState];
                                data.push(newData);
                                return [...data];
                            });
                        }, 600);
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
    );
}

export default ProductsTable;

