import React from "react";
import { AppHeader } from "../components/app-header/app-header";
import styles from "./styles.module.css";
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newPassword } from "../services/actions/router";
import { useSelector } from "react-redux";

export const Reset = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [value, setValue] = React.useState({
        password: '',
        token: ''})
        
    const onChange = e => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    const {newPasswordSuccess} = useSelector(store => store.routeReducer)

    const inputRef = React.useRef(null)

    function submitHandler (evt) {
        evt.preventDefault()
        dispatch(newPassword(value))
    }

    React.useEffect(() => {
        if (newPasswordSuccess) {
            navigate('/login', {replace: true})
        }
    }, [newPasswordSuccess])

    return (
        <>
        <AppHeader />
        <main>
        <section className={styles.login}>
            <form name="login" className={styles.form} onSubmit={submitHandler}>
                <h1 className={styles.h1}>Вход</h1>
                <div className={styles.input}>
                    <PasswordInput onChange={onChange} value={value.password} name={'password'} />
                </div>
                <div className={styles.input}>
                    <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={value.token}
                    name={'token'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                </div>
                <div className={styles.button_container}>
                    <Button type="primary" size="medium">
                        Сохранить
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