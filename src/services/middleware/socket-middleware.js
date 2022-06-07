import { getCookie } from "../../utils/constants"

export const socketMiddleware = (wsUrl, wsActions, getOrders, reverse=false, profile=false) => {
    return store => {
        let socket = null

        return next => action => {
            const {dispatch} = store
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit && profile === true) {
                socket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken")}`)
            }

            if (type === wsInit && profile === false) {
              socket = new WebSocket(`${wsUrl}/all`)
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
                    dispatch(getOrders(onMessage, parsedData, reverse));
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