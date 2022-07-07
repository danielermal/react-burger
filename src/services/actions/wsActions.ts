import { updateToken } from "./router";
import { AppDispatch, AppThunk, RootState } from "../types";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IItem, TOrder, TOrders } from "../types/data";
import {
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_GET_MESSAGE,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE
} from "../constants/wsActions";

type TWsOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

type TWsOrders = {
  success: boolean;
  total: number | null;
  totalToday: number | null
  orders: Array<TWsOrder>
}

interface IWsOrderConnectionSuccessAction {
  readonly type: typeof WS_ORDER_CONNECTION_SUCCESS
  payload: any
}

interface IWsOrderConnectionErrorAction {
  readonly type: typeof WS_ORDER_CONNECTION_ERROR
}

interface IWsOrderConnectionClosedAction {
  readonly type: typeof WS_ORDER_CONNECTION_CLOSED
}

interface IWsOrderGetMessageAction {
  readonly type: typeof WS_ORDER_GET_MESSAGE;
  payload: TOrders
}

interface IWsFeedConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS
  payload: any
}

interface IWsFeedConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR
}

interface IWsFeedConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED
}

interface IWsFeedGetMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE
  payload: TOrders
}

export type TWsActions = 
| IWsFeedConnectionClosedAction
| IWsFeedConnectionErrorAction
| IWsFeedConnectionSuccessAction
| IWsFeedGetMessageAction
| IWsOrderConnectionClosedAction
| IWsOrderConnectionErrorAction
| IWsOrderConnectionSuccessAction
| IWsOrderGetMessageAction

export const getOrders = (actionType: TWsActions, action: TWsOrders, reverse = false): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const { orders } = action;
    const { items } = getState().reducer;
    if (orders) {
      const timeNow = new Date().getTime();
      const newItems = JSON.parse(JSON.stringify(items));
      if (newItems) {
        const newOrders = orders.map((order: TWsOrder): TOrder => {
          const newIngredients: Array<IItem> = [];
          order.ingredients.forEach((ingredient) => {
            newItems.forEach((item: IItem) => {
              if (item._id === ingredient) {
                newIngredients.push(item);
              }
            });
          });
          const price = newIngredients.reduce((acc: number, res: IItem) => acc + res.price, 0);
          const timeString: Array<string | number> = order.createdAt.split("T")[0].split("-");
          timeString[2] = Number(timeString[2]) + 1;
          const timeToEnd = Date.parse(timeString.join("-"));
          const daysAgo = Math.floor(
            (timeNow - timeToEnd) / 1000 / 3600 / 24 + 1
          );
          const time = order.createdAt
            .split("T")[1]
            .split(":")
            .splice(0, 2)
            .join(":");
          let currentTime;
          if (daysAgo === 0) {
            currentTime = `Сегодня, ${time} i-GM3+3`;
          } else if (daysAgo === 1) {
            currentTime = `Вчера, ${time} i-GM3+3`;
          } else if (daysAgo >= 2 && daysAgo <= 4) {
            currentTime = `${daysAgo} дня назад, ${time} i-GM3+3`;
          } else {
            currentTime = `${daysAgo} дней назад, ${time} i-GM3+3`;
          }
          order.createdAt = currentTime;
          const newOrder: TOrder = {ingredients: newIngredients, createdAt: order.createdAt, name: order.name, number: order.number, price: price, status: order.status, updatedAt: order.updatedAt, _id: order._id}
          return newOrder;
        });
        
        if (reverse) {
          newOrders.reverse();
        }
        dispatch({
          type: actionType,
          payload: { ...action, orders: newOrders },
        });
      }
    }
    else {
      updateToken(false)
      dispatch({type: actionType, payload: {...action, orders: null}})
    }
  };
};
