import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index.js";
import { compose, createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import { wsURL } from "./utils/constants";
import { getOrders } from "./services/actions/wsActions";
import {
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_START,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_GET_MESSAGE,
  WS_ORDER_SEND_MESSAGE,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "./services/actions/wsActions";
import thunk from "redux-thunk";

const wsActionsOrders = {
  wsInit: WS_ORDER_CONNECTION_START,
  wsSendMessage: WS_ORDER_SEND_MESSAGE,
  onOpen: WS_ORDER_CONNECTION_SUCCESS,
  onClose: WS_ORDER_CONNECTION_CLOSED,
  onError: WS_ORDER_CONNECTION_ERROR,
  onMessage: WS_ORDER_GET_MESSAGE,
};

const wsActionsFeed = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(
      wsURL,
      wsActionsOrders, getOrders, true, true
    ),
    socketMiddleware(
      wsURL,
      wsActionsFeed, getOrders
    )
  )
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
