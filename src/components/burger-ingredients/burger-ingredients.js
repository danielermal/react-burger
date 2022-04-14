import React from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/constants';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

export const BurgerIngredients = () => {

    const {items} = useSelector(store => store.reducer)
    
    const [current, setCurrent] = React.useState('Булки')

    const [state, setState] = React.useState({overlay: false})

    const closeModal = () => {
      setState({...state, overlay: false})
    }

    const handleScroll = (evt) => {
        const scrollTop = evt.target.scrollTop
        if (scrollTop <= 246) {
            setCurrent('Булки')
        }
        else if (scrollTop <= 800) {
            setCurrent('Соусы')
        }
        else {
            setCurrent('Начинки')
        }
    }
  
    const openModalIngredient = React.useCallback ((item) => {
        setState({...state, overlay:true, ingridient: item})
      }, [])

    const buns = []
    const main = []
    const sauce = []

    items.forEach((ingredient) => {
        if (ingredient.type === "bun") {
            buns.push(ingredient)
        }
        else if (ingredient.type === "main") {
            main.push(ingredient)
        }
        else {
            sauce.push(ingredient)
        }
    })
  
    return (
        <>
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
            <div className={burgerIngredients.menu} onScroll={handleScroll}>
                <CardContainer title='Булки' cards={buns} key='bun' openModal={openModalIngredient} />
                <CardContainer title='Соусы' cards={sauce} key='sauce' openModal={openModalIngredient}/>
                <CardContainer title='Начинки' cards={main} key='main' openModal={openModalIngredient}/>
            </div>
            {state.overlay && <Modal onClose={closeModal} title={'Детали заказа'} >
                <IngredientDetails card={state.ingridient} />
            </Modal> }
        </div>
        </>
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

    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: card,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      })

    const handleClick = () => {
        openModal(card)
    }

    return (
        <article className={burgerIngredients.card} onClick={handleClick} ref={ref} style={{opacity}} >
            <img src={card.image} alt={`${card.name}`} className={burgerIngredients.image} />
            {card.count > 0 && <Counter count={card.count} size="default" /> }
            
            <p className={burgerIngredients.price}>
                <span className='mr-2'>{card.price}</span>
                 <CurrencyIcon type="primary" />
             </p>
             <h3 className={burgerIngredients.name}>{card.name}</h3>
        </article>
    )
}

  CardContainer.propTypes = {
    cards: PropTypes.arrayOf(cardPropTypes).isRequired,
    title: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
  }

  Card.propTypes = {
    card: cardPropTypes.isRequired,
    openModal: PropTypes.func.isRequired
  }