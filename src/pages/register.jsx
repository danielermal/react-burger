import React from "react";
import styles from "./styles.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../services/actions/router";
import { useDispatch, useSelector } from "react-redux";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {registrationSuccess} = useSelector((store) => store.routeReducer);

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const inputRef = React.useRef(null);

  function registerHandler(evt) {
    evt.preventDefault();
    dispatch(registration(value));
  }

  React.useEffect(() => {
    if (registrationSuccess) {
      navigate("/login", { replace: true });
    }
  }, [registrationSuccess]);

  return (
    <main>
      <section className={styles.login}>
        <form
          name="register"
          className={styles.form}
          onSubmit={registerHandler}
        >
          <h1 className={styles.h1}>Регистрация</h1>
          <div className={styles.input}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={value.name}
              name={"name"}
              error={false}
              ref={inputRef}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
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
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
          <span className={styles.text}>
            Уже зарегистрированы?
            <Link to="/login" className={`${styles.link} ml-2`}>
              Войти
            </Link>
          </span>
        </form>
      </section>
    </main>
  );
};
