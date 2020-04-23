import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Products = () => {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const onLoadProducts = useCallback(() => dispatch(actionCreators.onLoadProducts()), [dispatch]);
    const classes = useStyles();

    useEffect(() => {
        onLoadProducts();
    }, [onLoadProducts]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Precio</TableCell>
                        <TableCell align="center">Unidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{row.nombre}</TableCell>
                            <TableCell align="center">{row.precio}</TableCell>
                            <TableCell align="center">{row.unidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(Products);