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
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { ADD_ITEM, DELETE_ITEM, CHANGE_ITEM } from '../../services/actions';
import { v4 as uuidv4 } from 'uuid';

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

const ListItem = ({item, index}) => {

  const ref = React.useRef(null)

  const dispatch = useDispatch()

  const [{ opacity}, drag] = useDrag({
    type: 'ingredient',
    item: {item: item, index: index},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const deleteItem = () => {
    dispatch({
      type: DELETE_ITEM,
      item
    })
  }

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop(item) {
      changeItem(index, item)
    }
  })

  drag(drop(ref))

  const changeItem = (hoverIndex, item) => {
    dispatch({
      type: CHANGE_ITEM,
      dragItem: item.item,
      dragIndex: item.index,
      hoverIndex: hoverIndex
    })
  }

  return (
    <article className={burgerConstructor.article} ref={ref} style={{opacity}} >
    <DragIcon type="primary" />
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={deleteItem}
    />
  </article>
  )
}


export const BurgerConstructor = () => {

  const dispatch = useDispatch()

  const {constructorItems, bun} = useSelector(store => store.reducer)
  const ingredients = [constructorItems, bun]
  const totalPrice = constructorItems.reduce((acc, item) => acc + item.price, 0) + (typeof(bun.price) == 'number' ? bun.price : 0)
  const totalId = ingredients.map(item => item._id)
  const [state, setState] = React.useState({
    overlay: false
  })

  const [{isHover}, dropTarget] = useDrop({
    accept: 'items',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      addItem(item)
    }
  })

  const addItem = (item) => {
    dispatch({
      type: ADD_ITEM,
      item: item
    })
  }

  const closeModal = () => {
    setState({...state, overlay: false})
  }

    const openModalOrder = () => {
      setState({...state, overlay:true})
      dispatch(getOrder(totalId))
    }

    const {order, orderRequest, orderFailed} = useSelector(store => store.reducer)

    return (
      <div className={burgerConstructor.container}>
        <div className={!isHover ? burgerConstructor.burger : `${burgerConstructor.burger} ${burgerConstructor.burger_hover}`} ref={dropTarget}>
          {bun.price && <Bun bun={bun} type='top' position='(верх)' />}
          <div className={burgerConstructor.ingridients}>
            {constructorItems.map(
              (item, index) =>
              <ListItem key={uuidv4()} item={item} index={index} />
            )}
          </div>
          {bun.price && <Bun bun={bun} type='bottom' position='(низ)' />}
        </div>
        <div className={burgerConstructor.total}>
          <p className="mr-10">
            <span className="text text_type_digits-medium mr-2">{totalPrice ? totalPrice : 0}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={openModalOrder} disabled={(bun.price && constructorItems.length) ? false : true} >
            {(bun.price && constructorItems.length) ? 'Оформить заказ' : 'Добавьте булку и ингредиенты'}
          </Button>
          {state.overlay &&   
            <Modal onClose={closeModal} title={''} >
                {orderRequest && 'Загрузка...'}
                {orderFailed && 'Произошла ошибка'}
                {!orderRequest && !orderFailed &&
              <OrderDetails number={order} />}
            </Modal>}
        </div>
      </div>
    );
}

ListItem.propTypes = {
  item: cardPropTypes.isRequired,
  index: PropTypes.number.isRequired
}

Bun.propTypes = {
  bun: cardPropTypes.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
}