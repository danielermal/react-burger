import { getCookie } from "../../utils/constants"

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
        let socket = null

        return next => action => {
            const {dispatch, getState} = store
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const {isAuth} = getState().routeReducer

            if (type === wsInit && isAuth) {
                socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`)
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                    console.log('опен')
                  };

                  socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                    
                  };

                  socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
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