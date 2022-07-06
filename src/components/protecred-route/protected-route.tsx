import styles from '../../pages/styles.module.css'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import { ILocation } from '../../services/types/data';
import { FC, ReactNode } from 'react';

interface IProtectedRoute {
    children: ReactNode;
    anonymus: boolean;
    reset: boolean
}

export const ProtectedRoute: FC<IProtectedRoute> = ({children, anonymus = false, reset = false}) => {

    const {isAuth, resetPasswordSuccess, getUserInfoRequest } = useSelector(
        (store) => store.routeReducer
    );
    const location = useLocation() as ILocation
    
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