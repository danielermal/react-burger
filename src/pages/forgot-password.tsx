import React, { ChangeEvent, FC, FormEvent, useEffect } from "react";
import styles from "./styles.module.css";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { resetPassword } from "../services/actions/router";

export const Forgot: FC = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
        
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail( e.target.value)
    }
    const inputRef = React.useRef(null)

    const {resetPasswordSuccess} = useSelector(store => store.routeReducer)

    function reset (evt: FormEvent) {
        evt.preventDefault()
        dispatch(resetPassword(email))
    }

    useEffect(() => {
        if (resetPasswordSuccess) {
            navigate('/reset-password', {replace: true})
        }
    }, [resetPasswordSuccess])


    return (
        <>
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