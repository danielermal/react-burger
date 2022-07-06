import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILED, AUTHORIZATION_REQUEST, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAILED, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILED, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_REQUEST, NEW_PASSWORD_FAILED, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_REQUEST, UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "../constants/router";
import { TRouterActions } from "../actions/router";

interface IInitialState {
    resetPasswordSuccess: boolean;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
    newPasswordSuccess: boolean;
    newPasswordRequest: boolean;
    newPasswordFailed: boolean;
    registrationRequest: boolean;
    registrationSuccess: boolean;
    registrationFailed: boolean;
    authorizationRequest: boolean;
    authorizationSuccess: boolean;
    authorizationFailed: boolean;
    getUserInfoSuccess: boolean;
    getUserInfoRequest: boolean;
    getUserInfoFailed: boolean;
    updateUserInfoRequest: boolean;
    updateUserInfoSuccess: boolean;
    updateUserInfoFailed: boolean;
    logoutRequest: boolean;
    logoutSuccess: boolean;
    logoutFailed: boolean;
    isAuth: boolean;
    user: {
        email: string;
        name: string
    }
}

const initialState = {
    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    newPasswordSuccess: false,
    newPasswordRequest: false,
    newPasswordFailed: false,
    registrationRequest: false,
    registrationSuccess: false,
    registrationFailed: false,
    authorizationRequest: false,
    authorizationSuccess: false,
    authorizationFailed: false,
    getUserInfoSuccess: false,
    getUserInfoRequest: false,
    getUserInfoFailed: false,
    updateUserInfoRequest: false,
    updateUserInfoSuccess: false,
    updateUserInfoFailed: false,
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
    isAuth: false,
    user: {
        email: '',
        name: ''
    }
}

export const routeReducer = (state: IInitialState = initialState, action: TRouterActions): IInitialState => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {...state,
            resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state,
            resetPasswordRequest: false,
            resetPasswordSuccess: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {...state,
            resetPasswordRequest: false,
            resetPasswordFailed: true
            }
        }
        case NEW_PASSWORD_REQUEST: {
            return {...state,
            newPasswordRequest: true
            }
        }
        case NEW_PASSWORD_SUCCESS: {
            return {...state,
            newPasswordRequest: false,
            newPasswordSuccess: true,
            resetPasswordSuccess: false
            }
        }
        case NEW_PASSWORD_FAILED: {
            return {...state,
            newPasswordRequest: false,
            newPasswordFailed: true
            }
        }
        case REGISTRATION_REQUEST: {
            return {...state, registrationRequest: true}
        }
        case REGISTRATION_SUCCESS: {
            return {...state, registrationRequest: false, registrationSuccess: true, user: {name: action.data.user.name, email: action.data.user.email}}
        }
        case REGISTRATION_FAILED: {
            return {...state, registrationRequest: false, registrationFailed: true}
        }
        case AUTHORIZATION_REQUEST: {
            return {...state, authorizationRequest: true}
        }
        case AUTHORIZATION_SUCCESS: {
            return {...state, authorizationRequest: false, authorizationSuccess: true, isAuth: true, user: {name: action.data.user.name, email: action.data.user.email}}
        }
        case AUTHORIZATION_FAILED: {
            return {...state, authorizationRequest: false, authorizationFailed: true}
        }
        case GET_USER_INFO_REQUEST: {
            return {...state, getUserInfoRequest: true}
        }
        case GET_USER_INFO_SUCCESS: {
            return {...state, getUserInfoRequest: false, getUserInfoFailed: false, getUserInfoSuccess: true, isAuth: true, user: {name: action.data.user.name, email: action.data.user.email}}
        }
        case GET_USER_INFO_FAILED: {
            return {...state, getUserInfoRequest: false, getUserInfoFailed: true}
        }
        case UPDATE_USER_INFO_REQUEST: {
            return {...state, updateUserInfoRequest: true}
        }
        case UPDATE_USER_INFO_SUCCESS: {
            return {...state, updateUserInfoRequest: false, updateUserInfoFailed: false, updateUserInfoSuccess: true, user: {name: action.data.user.name, email: action.data.user.email}}
        }
        case UPDATE_USER_INFO_FAILED: {
            return {...state, updateUserInfoRequest: false, updateUserInfoFailed: true}
        }
        case LOGOUT_REQUEST: {
            return {...state, logoutRequest: true}
        }
        case LOGOUT_SUCCESS: {
            return {...state, logoutRequest: false, logoutSuccess: true, user: {name: '', email: ''}, isAuth: false}
        }
        case LOGOUT_FAILED: {
            return {...state, logoutRequest: false, logoutFailed: true}
        }
        default: {
            return state;
          }
    }
}