import React, { useState } from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridients from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

export const BurgerIngridients = ({cards}) => {
    const [current, setCurrent] = React.useState('Булки')
    const bun = []
    const main = []
    const sauce = []
     cards.forEach((card) => {
        if (card.type === "bun") {
            bun.push(card)
        }
        else if (card.type === "main") {
            main.push(card)
        }
        else {
            sauce.push(card)
        }
    })
    console.log(bun, main, sauce)
    return (
        <div>
            <h1 className={burgerIngridients.h1}>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mt-5'>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>
            <div className={burgerIngridients.menu}>
                <CardContainer title='Булки' cards={bun} key='bun' />
                <CardContainer title='Соусы' cards={sauce} key='sauce' />
                <CardContainer title='Начинки' cards={main} key='main' />
            </div>
        </div>
    )
}

const CardContainer = (props) => {
    const cards = props.cards
    return (
            <article className={burgerIngridients.item}>
                <h2 className={burgerIngridients.title}>{props.title}</h2>
                <div className={burgerIngridients.container}>
                    {cards.map((card) => (
                    <Card img={card.image} price={card.price} name={card.name} key={card._id} />
                    ))}
                </div>
             </article>
    )
}

const Card = (props) => {

    const [state, setState] = React.useState({count: 0})

    const handleClick = () => {
        setState({
            ...state,
            count: state.count + 1
        })
    }

    return (
        <article className={burgerIngridients.card} onClick={handleClick} >
            <img src={props.img} alt={`${props.img}`} className={burgerIngridients.image} />
            {state.count > 0 && <Counter count={state.count} size="default" /> }
            
            <p className={burgerIngridients.price}>
                <span className='mr-2'>{props.price}</span>
                 <CurrencyIcon type="primary" />
             </p>
             <h3 className={burgerIngridients.name}>{props.name}</h3>
        </article>
    )
}

BurgerIngridients.propTypes = ({
    title: PropTypes.string,
    description: PropTypes.string,
    calories: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    proteins: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    fats: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    carbohydrates: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })