import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './NewOrderForm.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
const Form = ({ products, addProduct }) => {
    const classes = useStyles();
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const onQuantityChange = (event) => {
        setQuantity(+event.target.value)
    }
    const onProductChange = (product) => {
        setProduct(product)
    }

    return (
        <form className={`${classes.root} ${styles.NewOrderForm}`} autoComplete="off">
            <Autocomplete
                required
                onChange={(e, v) => onProductChange(v)}
                id="combo-box-demo"
                options={products}
                getOptionLabel={(product) => product.nombre}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Productos" variant="outlined" required />}
            />
            <TextField value={quantity} onChange={onQuantityChange} required id="outlined-basic" label="Kilos" variant="outlined" InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }} />
            <Button variant="outlined" color="primary" size="large" startIcon={<SaveIcon />} onClick={() => addProduct({ ...product, quantity })}>
                Agregar
            </Button>
        </form>
    );
}

export default Form;