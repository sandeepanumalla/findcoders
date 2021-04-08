import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* import App from './App'; */
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import App from './App';

import reportWebVitals from './reportWebVitals';
import reducers from '././reducers/index'
import thunk from 'redux-thunk';


const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
