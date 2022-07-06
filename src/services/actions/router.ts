import {
  resetPasswordRequest,
  registrationRequest,
  authorizationRequest,
  getUserInfoRequest,
  updateTokenRequest,
  logoutRequest,
  newPasswordRequest,
  updateUserInfoRequest,
} from "../Api";

import { setCookie, deleteCookie, checkResponse } from "../../utils/constants";

import { AppDispatch, AppThunk } from "../types";

import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILED, AUTHORIZATION_REQUEST, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAILED, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILED, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_REQUEST, NEW_PASSWORD_FAILED, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_REQUEST, UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "../constants/router";

export interface INewPasswordForm {
  ['password']: string;
  ['token']: string;
}

export interface IRegistrationForm {
  ['email']: string
  ['password']: string
  ['name']: string
}

export interface IAuthorizationForm {
  ['email']: string
  ['password']: string
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPassworFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IRegistrationRequestAction {
  readonly type: typeof REGISTRATION_REQUEST
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS
  data: any
}

export interface IRegistrationFailedAction {
  readonly type: typeof REGISTRATION_FAILED
}

export interface IAuthorizationRequestAction {
  readonly type: typeof AUTHORIZATION_REQUEST
}

export interface IAuthorizationSuccessAction {
  readonly type: typeof AUTHORIZATION_SUCCESS
  data: any
}

export interface IAuthorizationFailedAction {
  readonly type: typeof AUTHORIZATION_FAILED
}

export interface IGetUserInfoRequestAction {
  readonly type: typeof GET_USER_INFO_REQUEST
}

export interface IGetUserInfoSuccessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS
  data: any
}

export interface IGetUserInfoFailedAction {
  readonly type: typeof GET_USER_INFO_FAILED
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED
}

export interface INewPasswordRequestAction {
  readonly type: typeof NEW_PASSWORD_REQUEST
}

export interface INewPasswordSuccessAction {
  readonly type: typeof NEW_PASSWORD_SUCCESS
}

export interface INewPasswordFailedAction {
  readonly type: typeof NEW_PASSWORD_FAILED
}

export interface IUpdateUserInfoRequestAction {
  readonly type: typeof UPDATE_USER_INFO_REQUEST
}

export interface IUpdateUserInfoSuccessAction {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS
  data: any
}

export interface IUpdateUserInfoFailedAction {
  readonly type: typeof UPDATE_USER_INFO_FAILED
}

export type TRouterActions = 
| IResetPassworFailedAction
| IResetPasswordRequestAction
| IResetPasswordSuccessAction
| IRegistrationFailedAction
| IRegistrationRequestAction
| IRegistrationSuccessAction
| IAuthorizationFailedAction
| IAuthorizationRequestAction
| IAuthorizationSuccessAction
| IGetUserInfoFailedAction
| IGetUserInfoRequestAction
| IGetUserInfoSuccessAction
| ILogoutFailedAction
| ILogoutRequestAction
| ILogoutSuccessAction
| INewPasswordFailedAction
| INewPasswordRequestAction
| INewPasswordSuccessAction
| IUpdateUserInfoFailedAction
| IUpdateUserInfoRequestAction
| IUpdateUserInfoSuccessAction

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST
})

export const resetPasswordFailedAction = (): IResetPassworFailedAction => ({
  type: RESET_PASSWORD_FAILED
})

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
})

export const registrationRequestAction = (): IRegistrationRequestAction => ({
  type: REGISTRATION_REQUEST
})

export const registrationSuccessAction = (data: any): IRegistrationSuccessAction => ({
  type: REGISTRATION_SUCCESS,
  data
})

export const registrationFailedAction = (): IRegistrationFailedAction => ({
  type: REGISTRATION_FAILED
})

export const authorizationRequestAction = (): IAuthorizationRequestAction => ({
  type: AUTHORIZATION_REQUEST
})

export const authorizationSuccessAction = (data: any): IAuthorizationSuccessAction => ({
  type: AUTHORIZATION_SUCCESS,
  data
})

export const authorizationFailedAction = (): IAuthorizationFailedAction => ({
  type: AUTHORIZATION_FAILED
})

export const getUserInfoRequestAction = (): IGetUserInfoRequestAction => ({
  type: GET_USER_INFO_REQUEST
})

export const getUserInfoSuccessAction = (data: any): IGetUserInfoSuccessAction => ({
  type: GET_USER_INFO_SUCCESS,
  data
})

export const getUserInfoFailedAction = (): IGetUserInfoFailedAction => ({
  type: GET_USER_INFO_FAILED
})

export const logoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST
})

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
})

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
})

export const newPasswordRequestAction = (): INewPasswordRequestAction => ({
  type: NEW_PASSWORD_REQUEST
})

export const newPasswordSuccessAction = (): INewPasswordSuccessAction => ({
  type: NEW_PASSWORD_SUCCESS
})

export const newPasswordFailedAction = (): INewPasswordFailedAction => ({
  type: NEW_PASSWORD_FAILED
})

export const updateUserInfoRequestAction = (): IUpdateUserInfoRequestAction => ({
  type: UPDATE_USER_INFO_REQUEST
})

export const updateUserInfoSuccessAction = (data: any): IUpdateUserInfoSuccessAction => ({
  type: UPDATE_USER_INFO_SUCCESS,
  data
})

export const updateUserInfoFailedAction = (): IUpdateUserInfoFailedAction => ({
  type: UPDATE_USER_INFO_FAILED
})

export const resetPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequestAction());
    resetPasswordRequest(email)
      .then(checkResponse)
      .then((data) => {
        dispatch(resetPasswordSuccessAction());
      })
      .catch((err) => {
        dispatch(resetPasswordFailedAction());
      });
  };
}

export const newPassword: AppThunk = (arg: INewPasswordForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(newPasswordRequestAction());
    newPasswordRequest(arg)
      .then(checkResponse)
      .then((data) => {
        dispatch(newPasswordSuccessAction());
      })
      .catch((err) => {
        dispatch(newPasswordFailedAction());
      });
  };
}

export const registration: AppThunk = (arg: IRegistrationForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(registrationRequestAction());
    registrationRequest(arg)
      .then(checkResponse)
      .then((data) => {
        dispatch(registrationSuccessAction(data));
      })
      .catch((err) => {
        dispatch(registrationFailedAction());
      });
  };
}

export const authorization: AppThunk = (arg: IAuthorizationForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(authorizationRequestAction());
    authorizationRequest(arg)
      .then(checkResponse)
      .then((data) => {
        let accessToken = data.accessToken.split("Bearer ")[1];
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(authorizationSuccessAction(data));
      })
      .catch((err) => {
        dispatch(authorizationFailedAction());
      });
  };
}

export const getUserInfo: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserInfoRequestAction());
    getUserInfoRequest()
      .then(checkResponse)
      .then((data) => {
        dispatch(getUserInfoSuccessAction(data));
      })
      .catch((err) => {
        dispatch(getUserInfoFailedAction());
      });
  };
}

export const updateToken: AppThunk = (action) => {
  return function (dispatch: AppDispatch) {
    updateTokenRequest()
    .then(checkResponse)
    .then((data) => {
      let accessToken = data.accessToken.split('Bearer ')[1]
      setCookie('accessToken', accessToken)
      localStorage.setItem("refreshToken", data.refreshToken);
      if (action) {
        dispatch(action)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export const updateUserInfo: AppThunk = (email: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserInfoRequestAction());
    updateUserInfoRequest(email, name)
      .then(checkResponse)
      .then((data) => {
        dispatch(updateUserInfoSuccessAction(data));
      })
      .catch((err) => {
        dispatch(updateUserInfoFailedAction());
      });
  };
}

export const logout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutRequestAction());
    logoutRequest()
      .then(checkResponse)
      .then((data) => {
        deleteCookie("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logoutSuccessAction());
      })
      .catch((err) => {
        dispatch(logoutFailedAction());
      });
  };
}
