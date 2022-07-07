import React, { FC } from "react";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { logout } from "../services/actions/router";
import { useDispatch } from "../services/hooks";
import { ProfileForm } from "../components/profile-form/profile-form";

export const Profile: FC = () => {

  const dispatch = useDispatch()

  const { pathname } = useLocation();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <main>
      <section className={styles.profile}>
        <div className={styles.profile_content}>
          <ul className={styles.profile_list}>
            <li>
              <Link
                to="/profile"
                className={styles.profile_item}
                style={{ color: pathname === "/profile" ? "#F2F2F3" : "" }}
              >
                Профиль
              </Link>
            </li>
            <Link to='orders' className={styles.profile_item}
            style={{ color: pathname.includes('orders') ? "#F2F2F3" : "" }}
            >История заказов</Link>
            <li className={styles.profile_item} onClick={logoutHandler}>
              Выход
            </li>
            <span className={styles.profile_about}>
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </ul>
          {pathname === '/profile' ? <ProfileForm /> : <Outlet />}
        </div>
      </section>
    </main>
  );
};
