import React, { useState } from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/constants';
import { Modal } from '../modal/modal';
import { IngridientDetails } from '../ingredient-details/ingredient-details';

export const BurgerIngredients = ({cards}) => {
    const [current, setCurrent] = React.useState('Булки')

    const [state, setState] = React.useState({overlay: false})

    const closeModal = () => {
      setState({...state, overlay: false})
    }
  
    const openModalIngredient = React.useCallback ((item) => {
        setState({...state, overlay:true, ingridient: item})
      }, [])

    const bun = []
    const main = []
    const sauce = []

    cards.forEach((ingredient) => {
        if (ingredient.type === "bun") {
            bun.push(ingredient)
        }
        else if (ingredient.type === "main") {
            main.push(ingredient)
        }
        else {
            sauce.push(ingredient)
        }
    })
  
    return (
        <div>
            <h1 className={burgerIngredients.h1}>Соберите бургер</h1>
            <div className={`mt-5 ${burgerIngredients.tab}`}>
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
            <div className={burgerIngredients.menu}>
                <CardContainer title='Булки' cards={bun} key='bun' openModal={openModalIngredient} />
                <CardContainer title='Соусы' cards={sauce} key='sauce' openModal={openModalIngredient}/>
                <CardContainer title='Начинки' cards={main} key='main' openModal={openModalIngredient}/>
            </div>
            {state.overlay && <Modal onClose={closeModal} title={true} >
                <IngridientDetails card={state.ingridient} />
            </Modal> }
        </div>
    )
}

const CardContainer = (props) => {
    const cards = props.cards
    return (
            <article className={burgerIngredients.item}>
                <h2 className={burgerIngredients.title}>{props.title}</h2>
                <div className={burgerIngredients.container}>
                    {cards.map((card) => (
                    <Card card={card} openModal={props.openModal} key={card._id} />
                    ))}
                </div>
             </article>
    )
}

const Card = ({card, openModal}) => {

    const [state, setState] = React.useState({count: 0})

    const handleClick = () => {
        openModal(card)
        setState({
            ...state,
            count: state.count + 1
        })
    }

    return (
        <article className={burgerIngredients.card} onClick={handleClick} >
            <img src={card.image} alt={`${card.name}`} className={burgerIngredients.image} />
            {state.count > 0 && <Counter count={state.count} size="default" /> }
            
            <p className={burgerIngredients.price}>
                <span className='mr-2'>{card.price}</span>
                 <CurrencyIcon type="primary" />
             </p>
             <h3 className={burgerIngredients.name}>{card.name}</h3>
        </article>
    )
}

BurgerIngredients.propTypes = {
    cards: PropTypes.arrayOf(cardPropTypes).isRequired,
  }

  CardContainer.propTypes = {
    cards: PropTypes.arrayOf(cardPropTypes).isRequired,
    title: PropTypes.string.isRequired
  }

  Card.propTypes = {
    card: cardPropTypes.isRequired
  }