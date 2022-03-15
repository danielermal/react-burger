import React from 'react'
import order from './order-details.module.css'
import doneImg from '../../images/done.png'

export const OrderDetails = () => {

    return (
        <>
            <p className={order.identity}>
            идентификатор заказа
            </p>
            <img src={doneImg} className={order.img} />
            <span className={order.span}>Ваш заказ начали готовить</span>
            <span className={order.span}>Дождитесь готовности на орбитальной станции</span>
        </>
    )
}