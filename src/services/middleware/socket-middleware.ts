import { Middleware } from "redux"
import { IWsActionsOrders } from "../store"
import { RootState } from "../types"

export const socketMiddleware = (wsUrl: string, wsActions: IWsActionsOrders, onGetMessage: Function, reverse=false): Middleware <{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null

        return next => action => {
            const {dispatch} = store
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`)
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                  };

                  socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                    
                  };

                  socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onGetMessage(onMessage, parsedData, reverse));
                  };

                  socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                  };

                  if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                 }
            }
            next(action)
        }
    }
}