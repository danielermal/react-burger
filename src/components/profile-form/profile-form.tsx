import React, { ChangeEvent, FC, FormEvent } from "react";
import styles from "../../pages/styles.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserInfo } from "../../services/actions/router";
import { updateToken } from "../../services/actions/router";

export const ProfileForm: FC = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.routeReducer.user);

  const [value, setValue] = React.useState({
    name: "",
    login: "",
    password: "",
  });

  const { updateUserInfoFailed } = useSelector((store) => store.routeReducer);

  React.useEffect(() => {
    setValue({ ...value, name: name, login: email });
  }, [name, email]);

  React.useEffect(() => {
    if (updateUserInfoFailed) {
      dispatch(updateToken(updateUserInfo(value.login, value.name)));
    }
  }, [updateUserInfoFailed]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  function submitHandler(evt: FormEvent) {
    evt.preventDefault();
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
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="secondary" size="medium" onClick={reset} htmlType="button">
          Отмена
        </Button>
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
