import React, { useState } from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridients from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/types';

export const BurgerIngridients = ({bun, sauce, main}) => {
    const [current, setCurrent] = React.useState('Булки')
    return (
        <div>
            <h1 className={burgerIngridients.h1}>Соберите бургер</h1>
            <div className={`mt-5 ${burgerIngridients.tab}`}>
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

BurgerIngridients.propTypes = {
    bun: PropTypes.arrayOf(cardPropTypes).isRequired,
    main: PropTypes.arrayOf(cardPropTypes).isRequired,
    sauce: PropTypes.arrayOf(cardPropTypes).isRequired
  }

  CardContainer.propTypes = {
    cards: PropTypes.arrayOf(cardPropTypes).isRequired,
    title: PropTypes.string.isRequired
  }

  Card.propTypes = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }