import React from 'react'
import ingredient from './ingredient.module.css'
import { cardPropTypes } from '../../utils/types'

export const IngridientDetails = ({card}) => {
    
    return (
        <>
        <h1 className={ingredient.h1}>
            Детали ингредиента
        </h1>
        <img src={card.image_large} className={ingredient.img} />
        <h2 className={ingredient.h2}>{card.name}</h2>
        <ul className={ingredient.list}>
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