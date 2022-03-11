import React from 'react';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { cardPropTypes } from '../burger-ingridients/burger-ingridients';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructor = ({cards}) => {

    return (
      <div className={burgerConstructor.container}>
        <div className={burgerConstructor.burger}>
          <article className={burgerConstructor.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
          </article>
          <div className={burgerConstructor.ingridients}>
            {cards.map(
              (ingridient) =>
                ingridient.type !== "bun" && (
                  <article className={burgerConstructor.article} key={ingridient._id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={ingridient.name}
                      price={ingridient.price}
                      thumbnail={ingridient.image}
                    />
                  </article>
                )
            )}
          </div>
          <article className={burgerConstructor.bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
          </article>
        </div>
        <div className={burgerConstructor.total}>
          <p className="mr-10">
            <span className="text text_type_digits-medium mr-2">610</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
}

BurgerConstructor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired
}