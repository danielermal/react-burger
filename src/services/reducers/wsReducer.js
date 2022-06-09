import {
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_GET_MESSAGE,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE
} from "../actions/wsActions";

const initialState = {
  wsOrderConnection: false,
  wsOrderError: false,
  ordersMessages: {},
  wsFeedConnection: false,
  feedMessages: {}
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsOrderError: false,
        wsOrderConnection: true,
      };

    case WS_ORDER_CONNECTION_ERROR:
      return {
        ...state,
        wsOrderConnection: false,
        wsOrderError: true
      };

    case WS_ORDER_CONNECTION_CLOSED:
      return {
        ...state,
        wsOrderConnection: false,
      };

    case WS_ORDER_GET_MESSAGE:
      return {
        ...state,
        ordersMessages: action.payload,
      };

      case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsFeedConnection: true,
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsFeedConnection: false,
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsFeedConnection: false,
      };

    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        feedMessages: action.payload,
      };

    default:
      return state;
  }
};
