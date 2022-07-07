import { getIngredientsRequest, getOrderRequest } from "../Api";
import { checkResponse } from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, AppThunk, RootState } from "../types";
import { IItem, INewItem } from "../types/data";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CHANGE_ITEM,
} from "../constants/index";

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly item: IItem;
}

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly item: IItem;
}

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  items: ReadonlyArray<IItem>;
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IChangeItemAction {
  readonly type: typeof CHANGE_ITEM;
  readonly newArray: Array<IItem>;
}

export type TIndexActions =
  | IDeleteItemAction
  | IAddItemAction
  | IGetItemsRequestAction
  | IGetItemsSuccessAction
  | IGetItemsFailedAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IChangeItemAction;

export const deleteItemAction = (item: IItem): IDeleteItemAction => ({
  type: DELETE_ITEM,
  item,
});

export const addItemAction = (item: IItem): IAddItemAction => ({
  type: ADD_ITEM,
  item,
});

export const getItemsRequestAction = (): IGetItemsRequestAction => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsSuccessAction = (
  items: ReadonlyArray<IItem>
): IGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  items: items,
});

export const getItemsFailedAction = (): IGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED,
});

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccessAction = (
  order: number
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order: order,
});

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});

export const changeItemAction = (
  newArray: Array<IItem>
): IChangeItemAction => ({
  type: CHANGE_ITEM,
  newArray: newArray,
});

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getItemsRequestAction());
    getIngredientsRequest()
      .then(checkResponse)
      .then((data) => {
        data.data = data.data.map((item: IItem): INewItem => {
          return { ...item, count: 0 };
        });
        dispatch(getItemsSuccessAction(data.data));
      })
      .catch((err) => {
        dispatch(getItemsFailedAction());
      });
  };
}

export const getOrder: AppThunk = (totalId: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequestAction());
    getOrderRequest(totalId)
      .then(checkResponse)
      .then((data) => {
        dispatch(getOrderSuccessAction(data.order.number));
      })
      .catch((err) => {
        dispatch(getOrderFailedAction());
      });
  };
}

export const sortIngredients = (dragIndex: number, dropIndex: number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const sortableIngredients = getState().reducer.constructorItems;
    sortableIngredients.splice(
      dropIndex,
      0,
      ...sortableIngredients.splice(dragIndex, 1)
    );
    dispatch(changeItemAction(sortableIngredients));
  };
};

export const addIngredients: AppThunk = (item: INewItem) => {
  return (dispatch: AppDispatch) => {
    item = { ...item, uuid: uuidv4() };
    dispatch(addItemAction(item));
  };
};
