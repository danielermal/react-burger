import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({children, anonymus = false}) => {

    const {isAuth, resetPasswordSuccess, getUserInfoRequest } = useSelector(
        (store) => store.routeReducer
    );

    if (getUserInfoRequest) {
        return <>{'загрузка...'}</>
    }

    if (anonymus && isAuth) {
        return <Navigate to='/' />
    }

    if (!anonymus && !isAuth) {
        return <Navigate to='/login' />
    }

    if (anonymus && isAuth && resetPasswordSuccess) {
        return <Navigate to='/reset-password' />
    }

    return <>{children}</>
}