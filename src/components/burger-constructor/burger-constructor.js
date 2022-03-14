import React from 'react';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { cardPropTypes } from '../../utils/types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details'
import { IngridientDetails } from '../ingredient-details/ingredient-details'


const Bun = React.memo (({bun, onCardClick, type, position}) => {
  const handleClick = () => {
    onCardClick(bun)
  }

  return (
    <article className={burgerConstructor.bun} onClick={handleClick}>
    <ConstructorElement
      type={type}
      isLocked={true}
      text={`${bun.name} ${position}`}
      price={bun.price}
      thumbnail={bun.image}
    />
  </article>
  )
})

const ListItem = React.memo (({item, onCardClick}) => {
  const handleClick = () => {
    onCardClick(item)
  }

  return (
    <article className={burgerConstructor.article} onClick={handleClick} >
    <DragIcon type="primary" />
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
    />
  </article>
  )
})

export const BurgerConstructor = ({cards}) => {

  const [state, setState] = React.useState({overlay: false})

  const closeModal = () => {
    setState({...state, overlay: false})
  }

  const openModalIngredient = React.useCallback ((item) => {
      setState({...state, overlay:true, ingridient: item})
    }, [])

    const openModalOrder = () => {
      setState({...state, overlay: true, ingridient: false})
    }
  

    return (
      <div className={burgerConstructor.container}>
        <div className={burgerConstructor.burger}>
          <Bun bun={cards[0]} type='top' position='(верх)' onCardClick={openModalIngredient} />
          <div className={burgerConstructor.ingridients}>
            {cards.map(
              (item) =>
                item.type !== "bun" && 
              <ListItem key={item._id} item={item} onCardClick={openModalIngredient} />
            )}
          </div>
          <Bun bun={cards[0]} type='bottom' position='(низ)' onCardClick={openModalIngredient} />
        </div>
        <div className={burgerConstructor.total}>
          <p className="mr-10">
            <span className="text text_type_digits-medium mr-2">610</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={openModalOrder} >
            Оформить заказ
          </Button>
          {state.overlay && 
          <ModalOverlay onClose={closeModal} card={state.ingridient}>
            <Modal onClose={closeModal}>
              {state.ingridient ? <IngridientDetails card={state.ingridient} /> : <OrderDetails />}
            </Modal>
          </ModalOverlay>}
        </div>
      </div>
    );
}

BurgerConstructor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired
}

ListItem.propTypes = {
  item: cardPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired
}

Bun.propTypes = {
  bun: cardPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
}