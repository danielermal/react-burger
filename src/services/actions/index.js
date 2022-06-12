import { getIngredientsRequest, getOrderRequest } from "../Api"
import { checkResponse } from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const CHANGE_ITEM = 'CHANGE_ITEM'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getIngredients () {
    return function(dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
          });
          getIngredientsRequest().then(checkResponse)
          .then((data) => {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                items: data.data
              });
          })
          .catch((err) => {
            dispatch({
                type: GET_ITEMS_FAILED
              });
          })
      };
}

export function getOrder (totalId) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(totalId).then(checkResponse)
    .then((data) => {
      dispatch({
          type: GET_ORDER_SUCCESS,
          order: data.order.number
        });
    })
    .catch((err) => {
      dispatch({
          type: GET_ORDER_FAILED
        });
    })
  }
}

export const sortIngredients = (dragIndex, dropIndex) => {
  return (dispatch, getState) => {
    const sortableIngredients = getState().reducer.constructorItems
    sortableIngredients.splice(dropIndex, 0, ...sortableIngredients.splice(dragIndex, 1));
    dispatch({ type: CHANGE_ITEM, newArray: sortableIngredients });
  }
}

export const addIngredients = (item) => {
  return (dispatch) => {
    item = {...item, uuid: uuidv4()}
    dispatch({type: ADD_ITEM, item})
  }
}