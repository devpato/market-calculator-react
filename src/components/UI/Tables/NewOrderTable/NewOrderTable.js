import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';

const NewOrdersTable = ({ products, deleteProduct, updateProduct }) => {

    const columns = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Cantidad', field: 'quantity', type: 'numeric' },
        { title: 'Unidad', field: 'unidad', type: 'string' },
        { title: 'Precio', field: 'precio', type: 'numeric' },
        { title: 'Total', field: 'total', type: 'numeric' },
    ];

    return (
        <MaterialTable
            title="Productos"
            columns={columns}
            data={products}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (oldData) {
                            resolve();
                            updateProduct(newData, oldData.tableData.id);
                        }
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        resolve();
                        deleteProduct(oldData.tableData.id);
                    }),
            }}
        />
    );
}

export default React.memo(NewOrdersTable);

