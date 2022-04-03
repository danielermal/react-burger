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
import { UserContext } from '../../services/userContext';
import { URL } from '../../utils/constants';


const Bun = ({bun, type, position}) => {

  const {dispatch} = React.useContext(UserContext)
  
  React.useEffect(() => {
    dispatch({
      price: bun.price,
      id: bun._id
    })
  }, [])

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

  const {dispatch} = React.useContext(UserContext)
  
  React.useEffect(() => {
    dispatch({
      price: item.price,
      id: item._id
    })
  }, [])

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



export const BurgerConstructor = () => {

  const {data, total} = React.useContext(UserContext)

  const [state, setState] = React.useState({
    overlay: false,
    isLoading: false,
    hasError: false
  })

  const closeModal = () => {
    setState({...state, overlay: false})
  }

    const openModalOrder = () => {
      getOrderNumber()
    }

    const getOrderNumber = async () =>  {
      setState({...state, overlay: true, hasError: false, isLoading: true})
      await fetch(`${URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients: total.id})
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      
      .then((data) => {
        setState({...state, overlay: true, isLoading: false, order: data.order.number})
      })
      .catch(err => setState({...state, hasError: true, isLoading: false}))
    }
  
    const ingredients = data.filter(item => item.type !== 'bun')

    return (
      <div className={burgerConstructor.container}>
        <div className={burgerConstructor.burger}>
          <Bun bun={data[0]} type='top' position='(верх)' />
          <div className={burgerConstructor.ingridients}>
            {ingredients.map(
              (item) =>
              <ListItem key={item._id} item={item} />
            )}
          </div>
          <Bun bun={data[0]} type='bottom' position='(низ)' />
        </div>
        <div className={burgerConstructor.total}>
          <p className="mr-10">
            <span className="text text_type_digits-medium mr-2">{total.price}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={openModalOrder} >
            Оформить заказ
          </Button>
          {state.overlay &&   
            <Modal onClose={closeModal} title={''} >
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Произошла ошибка'}
                {!state.isLoading && !state.hasError &&
              <OrderDetails number={state.order} />}
            </Modal>}
        </div>
      </div>
    );
}

ListItem.propTypes = {
  item: cardPropTypes.isRequired
}

Bun.propTypes = {
  bun: cardPropTypes.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
}