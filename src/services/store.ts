import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsURL } from "../utils/constants";
import { getOrders } from "./actions/wsActions";
import {
  WS_ORDER_CONNECTION_START,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_GET_MESSAGE,
  WS_ORDER_SEND_MESSAGE,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from "./constants/wsActions";

export interface IWsActionsOrders {
  wsInit: typeof WS_ORDER_CONNECTION_START | typeof WS_FEED_CONNECTION_START,
  wsSendMessage: typeof WS_ORDER_SEND_MESSAGE | typeof WS_FEED_SEND_MESSAGE,
  onOpen: typeof WS_ORDER_CONNECTION_SUCCESS | typeof WS_FEED_CONNECTION_SUCCESS,
  onClose: typeof WS_ORDER_CONNECTION_CLOSED | typeof WS_FEED_CONNECTION_CLOSED,
  onError: typeof WS_ORDER_CONNECTION_ERROR | typeof WS_FEED_CONNECTION_ERROR,
  onMessage: typeof WS_ORDER_GET_MESSAGE | typeof WS_FEED_GET_MESSAGE,
};

const wsActionsOrders: IWsActionsOrders = {
  wsInit: WS_ORDER_CONNECTION_START,
  wsSendMessage: WS_ORDER_SEND_MESSAGE,
  onOpen: WS_ORDER_CONNECTION_SUCCESS,
  onClose: WS_ORDER_CONNECTION_CLOSED,
  onError: WS_ORDER_CONNECTION_ERROR,
  onMessage: WS_ORDER_GET_MESSAGE,
};

const wsActionsFeed: IWsActionsOrders = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(
      wsURL,
      wsActionsOrders, getOrders, true
    ),
    socketMiddleware(
      wsURL,
      wsActionsFeed, getOrders
    )
  )
);

export const store = createStore(rootReducer, enhancer);