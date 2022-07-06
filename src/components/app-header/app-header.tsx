import React, { FC } from "react";
import appHeader from "./app-header.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

interface IAppHeaderProps {
  background: Location | undefined
}

export const AppHeader: FC<IAppHeaderProps> = ({ background }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = React.useState<boolean>(false);

  const toMainPage = () => {
    navigate("/", { replace: true });
  };

  React.useEffect(() => {
    if ((pathname.includes("ingredients") && !background) || (pathname.includes("orders/") && !background) || (pathname.includes("feed/") && !background)) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [pathname]);

  return (
    <header
      className={
        modal
          ? `p-4 ${appHeader.header} ${appHeader.header_modal}`
          : `p-4 ${appHeader.header}`
      }
    >
      <nav className={appHeader.nav}>
        <div className={appHeader.div}>
          <NavLink
            to="/"
            className={`${appHeader.button} p-5 p-4 mr-2`}
            style={({ isActive }) => {
              return {
                color: isActive ? "#F2F2F3" : "",
              };
            }}
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <span className="ml-2">Конструктор</span>
          </NavLink>
          <NavLink to='/feed' className={`${appHeader.button} p-5 p-4`}
          style={({ isActive }) => {
            return {
              color: isActive ? "#F2F2F3" : "",
            };
          }}>
            <ListIcon type={pathname.includes("/feed") ? "primary" : "secondary"} />
            <span className="ml-2">Лента заказов</span>
          </NavLink>
        </div>
        <div className={appHeader.logo} onClick={toMainPage}>
          <Logo />
        </div>

        <NavLink
          to="/profile"
          className={`${appHeader.button} ${appHeader.button_last}`}
          style={({ isActive }) => {
            return {
              color: isActive ? "#F2F2F3" : "",
            };
          }}
        >
          <ProfileIcon
            type={pathname.includes("/profile") ? "primary" : "secondary"}
          />
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
};
