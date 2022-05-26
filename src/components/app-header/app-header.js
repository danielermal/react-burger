import React from "react";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom"

export const AppHeader = ({background}) => {
  
  const {pathname} = useLocation()

  const [modal, setModal] = React.useState(false)

  React.useEffect(() => {
    if (pathname.includes('ingredients') && !background) {
      setModal(true)
    }
    else {
      setModal(false)
    }
  }, [pathname])

  return (
    <header className={modal ? `p-4 ${appHeader.header} ${appHeader.header_modal}` : `p-4 ${appHeader.header}`}>
      <nav className={appHeader.nav}>
        <div className={appHeader.div}>
          <NavLink
            to='/'
            className={`${appHeader.button} p-5 p-4 mr-2`}
            style={({ isActive }) => {
              return {
                color: isActive ? "#F2F2F3" : "",
              };
            }}
          >
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <span className="ml-2">Конструктор</span>
          </NavLink>
          <button
            className={`${appHeader.button} p-5 p-4`}
          >
            <ListIcon type="secondary" />
            <span className="ml-2">Лента заказов</span>
          </button>
        </div>

        <Logo className={appHeader.logo} />

        <NavLink
          to='/profile'
          className={`${appHeader.button} ${appHeader.button_last}`}
          style={({ isActive }) => {
            return {
              color: isActive ? "#F2F2F3" : "",
            };
          }}
        >
          <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
};
