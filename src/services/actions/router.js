import {
  resetPasswordRequest,
  registrationRequest,
  authorizationRequest,
  getUserInfoRequest,
  updateToken, logoutRequest, newPasswordRequest, updateUserInfoRequest
} from "../Api";

import { setCookie, deleteCookie, checkResponse } from "../../utils/constants";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWOR_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWOR_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWOR_FAILED";
export const NEW_PASSWORD_REQUEST = "NEW_PASSWOR_REQUEST";
export const NEW_PASSWORD_SUCCESS = "NEW_PASSWOR_SUCCESS";
export const NEW_PASSWORD_FAILED = "NEW_PASSWOR_FAILED";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED";
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILED = "UPDATE_USER_INFO_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export function resetPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(email)
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function newPassword(arg) {
  return function (dispatch) {
    dispatch({
      type: NEW_PASSWORD_REQUEST,
    });
    newPasswordRequest(arg)
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: NEW_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: NEW_PASSWORD_FAILED,
        });
      });
  };
}

export function registration(arg) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    registrationRequest(arg)
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };
}

export function authorization(arg) {
  return function (dispatch) {
    dispatch({
      type: AUTHORIZATION_REQUEST,
    });
    authorizationRequest(arg)
      .then(checkResponse)
      .then((data) => {
        let accessToken = data.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({
          type: AUTHORIZATION_SUCCESS,
          data,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTHORIZATION_FAILED,
        });
      });
  };
}

export function getUserInfo() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    getUserInfoRequest()
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_INFO_FAILED,
        });
        updateToken()
          .then(checkResponse)
          .then((data) => {
            console.log(data);
            let accessToken = data.accessToken.split('Bearer ')[1]
            setCookie('accessToken', accessToken)
            localStorage.setItem("refreshToken", data.refreshToken);
            getUserInfoRequest()
              .then(checkResponse)
              .then((data) => {
                dispatch({
                  type: GET_USER_INFO_SUCCESS,
                  data,
                });
              })
              .catch((err) => {
                console.log(err);
                dispatch({
                  type: GET_USER_INFO_FAILED,
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
}

export function updateUserInfo(email, name) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    updateUserInfoRequest(email, name)
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_INFO_FAILED,
        });
      })
    }
  }

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then(checkResponse)
      .then((data) => {
        deleteCookie('accessToken')
        console.log(document.cookie);
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}