import { URL } from "../utils/constants"

export const getIngredientsRequest = async () =>  {
    return await fetch(`${URL}ingredients`)
  }

export const getOrderRequest = async (totalId) =>  {
  return await fetch(`${URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ingredients: totalId})
    })
  }