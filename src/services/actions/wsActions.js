
export const WS_ORDER_CONNECTION_START = 'WS_ORDER_CONNECTION_START';
export const WS_ORDER_CONNECTION_SUCCESS = 'WS_ORDER_CONNECTION_SUCCESS';
export const WS_ORDER_CONNECTION_ERROR = 'WS_ORDER_CONNECTION_ERROR';
export const WS_ORDER_CONNECTION_CLOSED = 'WS_ORDER_CONNECTION_CLOSED';
export const WS_ORDER_GET_MESSAGE = 'WS_ORDER_GET_MESSAGE';
export const WS_ORDER_SEND_MESSAGE = 'WS_ORDER_SEND_MESSAGE';

export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE';

export const getOrders = (actionType, action, reverse=false) => {
    return(dispatch, getState) => {
        const {orders} = action
        const {items} = getState().reducer
        const timeNow = new Date().getTime()
        const newItems = JSON.parse(JSON.stringify(items))
        if (newItems) {
           const newOrders = orders.map((order) => {
                const newIngredients = []
                order.ingredients.forEach((ingredient)=> {
                  newItems.forEach((item) => {
                    if (item._id === ingredient) {
                      newIngredients.push(item)
                    }
                  })
                })
                order.ingredients = newIngredients
                const price = newIngredients.reduce((acc, res) => acc + res.price, 0)
                
                const timeString = order.createdAt.split('T')[0].split('-')
                timeString[2]=Number(timeString[2]) + 1
                const timeToEnd = Date.parse(timeString.join('-'))
                const daysAgo = Math.floor((timeNow - timeToEnd) / 1000 / 3600 / 24 + 1)
                const time = order.createdAt.split('T')[1].split(':').splice(0, 2).join(':')
                let currentTime
                if (daysAgo === 0) {
                  currentTime = `Сегодня, ${time} i-GM3+3`
                }
                else if (daysAgo === 1) {
                  currentTime = `Вчера, ${time} i-GM3+3`
                }
                else if (daysAgo >= 2 && daysAgo <= 4) {
                  currentTime = `${daysAgo} дня назад, ${time} i-GM3+3`
                }
                else {
                  currentTime = `${daysAgo} дней назад, ${time} i-GM3+3`
                }
                order.createdAt = currentTime
                return {...order, price};
              })
            if (reverse) {
              newOrders.reverse()
            }
            dispatch({type: actionType, payload: {...action, orders: newOrders}})
        }
    }
}