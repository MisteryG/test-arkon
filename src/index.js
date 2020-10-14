import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Principal from './containers/principal';
import Graficas from './containers/grafica'
import reducer from './store/reducers/storeRedux.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
const store = createStore (reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path="/menu/principal" exact component={Principal}/>
            <Route path="/menu/graficas" exact component={Graficas}/>
            <Redirect from="/" to="/menu/principal"/>
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
