import React from 'react';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { cardPropTypes } from '../../utils/constants';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'


const Bun = ({bun, type, position}) => {

  return (
    <article className={burgerConstructor.bun}>
    <ConstructorElement
      type={type}
      isLocked={true}
      text={`${bun.name} ${position}`}
      price={bun.price}
      thumbnail={bun.image}
    />
  </article>
  )
}

const ListItem = ({item}) => {

  return (
    <article className={burgerConstructor.article} >
    <DragIcon type="primary" />
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
    />
  </article>
  )
}

export const BurgerConstructor = ({cards}) => {

  const [state, setState] = React.useState({overlay: false})

  const closeModal = () => {
    setState({...state, overlay: false})
  }

    const openModalOrder = () => {
      setState({...state, overlay: true})
    }
  
    const ingredients = cards.filter(item => item.type !== 'bun')

    return (
      <div className={burgerConstructor.container}>
        <div className={burgerConstructor.burger}>
          <Bun bun={cards[0]} type='top' position='(верх)' />
          <div className={burgerConstructor.ingridients}>
            {ingredients.map(
              (item) =>
              <ListItem key={item._id} item={item} />
            )}
          </div>
          <Bun bun={cards[0]} type='bottom' position='(низ)' />
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
            <Modal onClose={closeModal} title={false} >
              <OrderDetails />
            </Modal>}
        </div>
      </div>
    );
}

BurgerConstructor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired
}

ListItem.propTypes = {
  item: cardPropTypes.isRequired
}

Bun.propTypes = {
  bun: cardPropTypes.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
}