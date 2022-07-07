import { URL } from "../utils/constants"
import { INewPasswordForm, IAuthorizationForm, IRegistrationForm } from "./actions/router"
import { getCookie } from "../utils/constants"

export const getIngredientsRequest = async () =>  {
    return await fetch(`${URL}ingredients`)
  }

export const getOrderRequest = async (totalId: Array<string>) =>  {
  return await fetch(`${URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ingredients: totalId})
    })
  }

  export const resetPasswordRequest = async (email: string) => {
    return await fetch(`${URL}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email: email})
    })
  }

  export const newPasswordRequest = async ({password, token}: INewPasswordForm) => {
    return await fetch(`${URL}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({password: password, token: token})
    })
  }

  export const registrationRequest = async ({email, password, name}: IRegistrationForm) => {
    console.log(email, password, name)
    return await fetch(`${URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
    })
  }

  export const authorizationRequest = async ({email, password}: IAuthorizationForm) => {
    return await fetch(`${URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          email: email,
          password: password
        })
    })
  }

  export const getUserInfoRequest = async () => {
    return await fetch(`${URL}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: 'Bearer ' + getCookie('accessToken')
      }
    })
  }

  export const updateUserInfoRequest = async (email: string, name: string) => {
    return await fetch(`${URL}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({
        email: email,
        name: name
      })
    })
  }

  export const updateTokenRequest = async () => {
    return await fetch(`${URL}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
  }

  export const logoutRequest = async () => {
    return await fetch(`${URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
  }