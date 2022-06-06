import React from "react";
import styles from '../../pages/styles.module.css'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({children, anonymus = false, reset = false}) => {

    const {isAuth, resetPasswordSuccess, getUserInfoRequest } = useSelector(
        (store) => store.routeReducer
    );

    const location = useLocation()

    const from = location.state?.from?.pathname;

    if (getUserInfoRequest) {
        return <>{<span>Загрузка<span className={styles.loading}>...</span></span>}</>
    }

    if (anonymus && isAuth) {
        return <Navigate to={from ? from : '/'} />
    }

    if (!anonymus && !isAuth) {
        return <Navigate to='/login' state={{from: location}} />
    }

    if (reset && !resetPasswordSuccess) {
        return <Navigate to='/' />
    }

    return <>{children}</>
}