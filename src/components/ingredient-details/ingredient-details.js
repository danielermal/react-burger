import React from 'react'
import ingredient from './ingredient.module.css'
import { cardPropTypes } from '../../utils/constants'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'


export const IngridientDetails = ({card}) => {
    
    return (
        <>
        <img src={card.image_large} className={ingredient.img} />
        <h2 className={ingredient.h2}>{card.name}</h2>
        <ul className={`${ingredient.list} mt-8 mb-15`}>
            <li className={ingredient.item}>
                <span className={ingredient.name}>Калории,ккал</span>
                <span className={ingredient.value}>{card.calories}</span>
            </li>
            <li className={ingredient.item}>
                <span className={ingredient.name}>Белки, г</span>
                <span className={ingredient.value}>{card.proteins}</span>
            </li>
            <li className={ingredient.item}>
                <span className={ingredient.name}>Жиры, г</span>
                <span className={ingredient.value}>{card.fat}</span>
            </li>
            <li className={ingredient.item}>
                <span className={ingredient.name}>Углеводы, г</span>
                <span className={ingredient.value}>{card.carbohydrates}</span>
            </li>
        </ul>
        </>
    )
}

IngridientDetails.propTypes = {
    card: cardPropTypes.isRequired
}