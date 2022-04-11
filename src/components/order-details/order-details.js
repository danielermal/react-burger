import React from 'react'
import order from './order-details.module.css'
import doneImg from '../../images/done.png'
import PropTypes from 'prop-types';

export const OrderDetails = ({number}) => {

    return (
        <>
            <h1 className='text text_type_digits-large mt-30'>{number}</h1>
            <p className={order.identity}>
            идентификатор заказа
            </p>
            <img src={doneImg} className={order.img} />
            <span className={order.span}>Ваш заказ начали готовить</span>
            <span className={order.span}>Дождитесь готовности на орбитальной станции</span>
        </>
    )
}

OrderDetails.propTypes = {
    number: PropTypes.number.isRequired
}