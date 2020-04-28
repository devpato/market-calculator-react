
import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Products = React.lazy(() => {
  return import('./containers/Products/Products');
});

const NewOrder = React.lazy(() => {
  return import('./containers/Orders/NewOrder/NewOrder');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Clients = React.lazy(() => {
  return import('./containers/Clients/Clients');
});

const App = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  let routes = (
    <Switch>
      <Route path="/productos" exact render={(props) => <Products {...props} />} />
      <Route path="/clientes" exact render={(props) => <Clients {...props} />} />
      <Route path="/ordenes" exact render={(props) => <Orders {...props} />} />
      <Route path="/nuevo" exact render={(props) => <Products {...props} />} />
      <Route path="/" exact render={(props) => <NewOrder {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <Suspense fallback={<Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>}>{routes}</Suspense>
    </div>
  );
}

export default withRouter(App);
