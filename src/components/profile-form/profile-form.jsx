import React from "react";
import styles from "../../pages/styles.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserInfo } from "../../services/actions/router";

export const ProfileForm = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.routeReducer.user);

  const [value, setValue] = React.useState({
    name: "",
    login: "",
    password: "",
  });

  React.useEffect(() => {
    setValue({ ...value, name: name, login: email });
  }, [name, email]);


  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const inputRef = React.useRef(null);

  function submitHandler(evt) {
    evt.preventDefault();
    console.log(value.login, value.name);
    dispatch(updateUserInfo(value.login, value.name));
  }

  function reset() {
    setValue({ ...value, name: name, login: email });
  }

  return (
          <form
            name="register"
            className={`${styles.form} ${styles.profile_form}`}
            onSubmit={submitHandler}
          >
            <div className={`${styles.input} ${styles.profile_input}`}>
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
                icon={"EditIcon"}
              />
            </div>
            <div className={styles.input}>
              <Input
                type={"text"}
                placeholder={"Логин"}
                onChange={onChange}
                value={value.login}
                name={"login"}
                error={false}
                ref={inputRef}
                errorText={"Ошибка"}
                size={"default"}
                icon={"EditIcon"}
              />
            </div>
            <div className={styles.input}>
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={onChange}
                value={value.password}
                name={"password"}
                error={false}
                ref={inputRef}
                errorText={"Ошибка"}
                size={"default"}
                icon={"EditIcon"}
              />
            </div>
            <div className={styles.buttons}>
              <Button type="secondary" size="medium" onClick={reset}>
                Отмена
              </Button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
  );
};
