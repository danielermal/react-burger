import React from "react";
import { AppHeader } from "../components/app-header/app-header";
import styles from "./styles.module.css";
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from "react-router-dom";
import { authorization } from "../services/actions/router";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {authorizationSuccess} = useSelector(store => store.routeReducer)

    const [value, setValue] = React.useState({
        email: '',
        password: ''})
        
    const onChange = e => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    function loginHandler (evt) {
        evt.preventDefault()
        dispatch(authorization(value))
    }

    React.useEffect(() => {
        if (authorizationSuccess) {
            navigate('/')
        }
    }, [authorizationSuccess])

    return (
        <>
        <AppHeader />
        <main>
        <section className={styles.login}>
            <form name="login" className={styles.form} onSubmit={loginHandler}>
                <h1 className={styles.h1}>Вход</h1>
                <div className={styles.input}>
                    <EmailInput onChange={onChange} value={value.email} name={'email'} />
                </div>
                <div className={styles.input}>
                    <PasswordInput onChange={onChange} value={value.password} name={'password'} />
                </div>
                <div className={styles.button_container}>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
                <span className={styles.text}>
                    Вы — новый пользователь?
                    <Link to='/register' className={`${styles.link} ml-2`}>Зарегистрироваться</Link>
                </span>
                <span className={`${styles.text} mt-4`}>
                    Забыли пароль?
                    <Link to='/forgot-password' className={`${styles.link} ml-2`}>Восстановить пароль</Link>
                </span>
            </form>
        </section>
      </main>
      </>
    )
}