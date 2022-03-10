import React from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeader from './app-header.module.css'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

console.log(appHeader)

export const AppHeader = () => {
    return (
        <header className={`p-4 ${appHeader.header}`}>
            <nav className={appHeader.nav}>
                <div className={appHeader.div}>
                    <button type='button' className={`${appHeader.button} p-5 p-4 mr-2`}>
                    <BurgerIcon type="primary" />
                    <span className="ml-2" >Конструктор</span>
                    </button>
                    <button type='button' className={`${appHeader.button} p-5 p-4`}>
                    <ListIcon type="primary" />
                    <span className="ml-2">Лента заказов</span>
                    </button>
                </div>

                <Logo className={appHeader.logo} />
                
                <button type='button' className={`${appHeader.button} ${appHeader.button_last}`}>
                <ProfileIcon type="primary" />
                <span className="ml-2">Личный кабинет</span>
                </button>
            </nav>
        </header>
    )
}