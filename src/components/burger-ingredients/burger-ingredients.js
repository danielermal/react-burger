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
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

export const BurgerIngredients = () => {

    const {items} = useSelector(store => store.reducer)
    
    const [current, setCurrent] = React.useState('Булки')

    const [state, setState] = React.useState({overlay: false})

    const closeModal = () => {
      setState({...state, overlay: false})
    }

    const handleScroll = () => {
        const scrollTop = ref.current.scrollTop
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

    const handleTab = (tab) => {
            if (tab === 'Булки') {
                setCurrent(tab)
                ref.current.scrollTop = 0
            }
            else if (tab === 'Соусы') {
                setCurrent(tab)
                ref.current.scrollTop = 248
            }
            else {
                setCurrent(tab)
                ref.current.scrollTop = 802
            }
            
    }

    const ref = React.useRef(null)

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
                <Tab value="Булки" active={current === 'Булки'} onClick={() => handleTab('Булки')}>
                Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleTab('Соусы')}>
                Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleTab('Начинки')}>
                Начинки
                </Tab>
            </div>
            <div className={burgerIngredients.menu} onScroll={handleScroll} ref={ref}>
                <CardContainer title='Булки' cards={buns} key='bun' />
                <CardContainer title='Соусы' cards={sauce} key='sauce'/>
                <CardContainer title='Начинки' cards={main} key='main'/>
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
                    <Card card={card} key={card._id} />
                    ))}
                </div>
             </article>
    )
}

const Card = ({card}) => {

    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: card,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      })

    const location = useLocation()

    return (
        <Link to={`ingredients/${card._id}`} state={{background: location}} className={burgerIngredients.card} ref={ref} style={{opacity}} >
            <img src={card.image} alt={`${card.name}`} className={burgerIngredients.image} />
            {card.count > 0 && <Counter count={card.count} size="default" /> }
            
            <p className={burgerIngredients.price}>
                <span className='mr-2'>{card.price}</span>
                 <CurrencyIcon type="primary" />
             </p>
             <h3 className={burgerIngredients.name}>{card.name}</h3>
        </Link>
    )
}

  CardContainer.propTypes = {
    cards: PropTypes.arrayOf(cardPropTypes).isRequired,
    title: PropTypes.string.isRequired
  }

  Card.propTypes = {
    card: cardPropTypes.isRequired
  }