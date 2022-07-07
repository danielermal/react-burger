import React, { FC } from 'react';
import burgerIngredients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useSelector } from '../../services/hooks';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { INewItem } from '../../services/types/data';

type TCards = {
    cards: Array<INewItem>,
    title: string
  }

type TCard = {
    card: INewItem
  }

export const BurgerIngredients: FC = () => {

    const {items} = useSelector(store => store.reducer)
    
    const [current, setCurrent] = React.useState('Булки')

    const [state, setState] = React.useState({overlay: false})

    const closeModal = () => {
      setState({...state, overlay: false})
    }

    const ref = React.useRef<HTMLDivElement | null>(null)

    const handleScroll = () => {
        const scrollTop = ref.current?.scrollTop ? ref.current.scrollTop : 1
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

    const handleTab = (tab: string) => {
        
            if (tab === 'Булки') {
                setCurrent(tab)
                if (ref.current?.scrollTop || ref.current?.scrollTop === 0) {
                    ref.current.scrollTop = 1
                }
            }
            else if (tab === 'Соусы') {
                setCurrent(tab)
                if (ref.current?.scrollTop || ref.current?.scrollTop === 0) {
                    ref.current.scrollTop = 248
                }
            }
            else {
                setCurrent(tab)
                if (ref.current?.scrollTop || ref.current?.scrollTop === 0) {
                    ref.current.scrollTop = 802
                }
            }
    }

    const buns: Array<INewItem> = []
    const main: Array<INewItem> = []
    const sauce: Array<INewItem> = []

    items.forEach((ingredient: INewItem) => {
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
                <IngredientDetails />
            </Modal> }
        </div>
        </>
    )
}

const CardContainer: FC<TCards> = (props) => {
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

const Card: FC<TCard> = ({card}) => {

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