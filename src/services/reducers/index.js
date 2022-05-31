import { DELETE_ITEM, ADD_ITEM, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CHANGE_ITEM } from '../actions/index'
import { combineReducers } from 'redux';
import { routeReducer } from './router';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    constructorItems: [],
    bun: {},
    totalPrice: null,
    order: null,
    orderRequest: false,
    orderFailed: false,
    dragItem : {},
    dragIndex: null,
    hoverIndex: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state, itemsFailed: false, items: action.items.map((item) => {
                    return {...item, count: 0}
                }), itemsRequest: false
            }
        }
        case GET_ITEMS_FAILED: {
            return { ...state, itemsFailed: true, itemsRequest: false };
          }
          case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state, orderFailed: false, order: action.order, orderRequest: false, constructorItems: [], bun: {}, items: [...state.items].map((item) => {
                    return {...item, count: 0}
                })
            }
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
          }
        case ADD_ITEM: {
            if (action.item.type === 'bun') {
                if (action.item.count < 1) {
                    return {...state, bun: action.item, items: [...state.items].map((item) => {
                        if (item.type === 'bun' && item._id === action.item._id) {
                            return {...item, count: ++item.count}
                        }
                        else if (item.type === 'bun') {
                            return {...item, count: 0}
                        }
                        else {
                            return {...item}
                        }
                    })}
                }
                else {
                    return {...state, bun: action.item}
                }
            }
            else {
                return {...state, constructorItems: [...state.constructorItems, action.item], items: [...state.items].map(item => item._id === action.item._id ? {...item, count: ++item.count} : item)}
            }
        }
        case DELETE_ITEM: {
            const deletedItem = state.constructorItems.find(item => item._id === action.item._id)
            return {...state, items: [...state.items].map(item => item._id === action.item._id ? {...item, count: --item.count} : item), constructorItems: state.constructorItems.filter(item => item !== deletedItem)}
        }
        case CHANGE_ITEM: {
            return {...state, constructorItems: action.newArray}
        }
          default: {
            return state;
          }
    }
}

export const rootReducer = combineReducers({reducer, routeReducer})