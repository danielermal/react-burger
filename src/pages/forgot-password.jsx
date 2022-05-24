import React, { useEffect } from "react";
import { AppHeader } from "../components/app-header/app-header";
import styles from "./styles.module.css";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../services/actions/router";
import { RESET_PASSWORD_DONE } from "../services/actions/router";

export const Forgot = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
        
    const onChange = e => {
        setEmail( e.target.value)
    }
    const inputRef = React.useRef(null)

    const {resetPasswordSuccess} = useSelector(store => store.routeReducer)

    function reset (evt) {
        evt.preventDefault()
        dispatch(resetPassword(email))
    }

    useEffect(() => {
        if (resetPasswordSuccess) {
            navigate('/reset-password', {replace: true})
            dispatch({
                type: RESET_PASSWORD_DONE
            })
        }
    }, [resetPasswordSuccess])

    return (
        <>
        <AppHeader />
        <main>
        <section className={styles.login}>
            <form name="register" className={styles.form} onSubmit={reset}>
                <h1 className={styles.h1}>Восстановление пароля</h1>
                <div className={styles.input}>
                    <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={onChange}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                </div>
                <div className={styles.button_container}>
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <span className={styles.text}>
                    Вспомнили пароль?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link>
                </span>
            </form>
        </section>
      </main>
      </>
    )
}