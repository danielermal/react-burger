import React, { ChangeEvent, FC, FormEvent } from "react";
import styles from "./styles.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { authorization } from "../services/actions/router";
import { useDispatch } from "../services/hooks";

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  function loginHandler(evt: FormEvent) {
    evt.preventDefault();
    dispatch(authorization(value));
  }

  return (
    <>
      <main>
        <section className={styles.login}>
          <form name="login" className={styles.form} onSubmit={loginHandler}>
            <h1 className={styles.h1}>Вход</h1>
            <div className={styles.input}>
              <EmailInput
                onChange={onChange}
                value={value.email}
                name={"email"}
              />
            </div>
            <div className={styles.input}>
              <PasswordInput
                onChange={onChange}
                value={value.password}
                name={"password"}
              />
            </div>
            <div className={styles.button_container}>
              <Button type="primary" size="medium" htmlType="submit">
                Войти
              </Button>
            </div>
            <span className={styles.text}>
              Вы — новый пользователь?
              <Link to="/register" className={`${styles.link} ml-2`}>
                Зарегистрироваться
              </Link>
            </span>
            <span className={`${styles.text} mt-4`}>
              Забыли пароль?
              <Link to="/forgot-password" className={`${styles.link} ml-2`}>
                Восстановить пароль
              </Link>
            </span>
          </form>
        </section>
      </main>
    </>
  );
};
