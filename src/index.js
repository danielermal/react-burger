import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index.js'
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from './services/middleware/socket-middleware';
import { wsURL } from './utils/constants';
import { WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE } from './services/actions/wsActions';
import thunk from 'redux-thunk';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsURL, wsActions)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
