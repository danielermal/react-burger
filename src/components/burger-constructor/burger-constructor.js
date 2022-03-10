import React from 'react';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

export const BurgerConstructor = ({cards}) => {

    const ingridients = []
    cards.forEach((card) => {
        if (card.type === 'bun') {
            return card
        }
        else {
            ingridients.push(card)
        }
    })

    return (
      <div className={burgerConstructor.container}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
          <div className={burgerConstructor.ingridients}>
            {ingridients.map((ingridient) => (
              <ConstructorElement
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image}
                key={ingridient._id}
              />
            ))}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
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

BurgerConstructor.propTypes = ({
  title: PropTypes.string,
  description: PropTypes.string,
  calories: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  proteins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  fats: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  carbohydrates: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
})