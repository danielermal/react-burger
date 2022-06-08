export const socketMiddleware = (wsUrl, payloadUrl, wsActions, onGetMessage, reverse=false) => {
    return store => {
        let socket = null

        return next => action => {
            const {dispatch} = store
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payloadUrl}`)
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