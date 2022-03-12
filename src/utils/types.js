import { data } from "./data";
import PropTypes from 'prop-types';

export const bun = []
export const main = []
export const sauce = []

data.forEach((ingridient) => {
    if (ingridient.type === "bun") {
        bun.push(ingridient)
    }
    else if (ingridient.type === "main") {
        main.push(ingridient)
    }
    else {
        sauce.push(ingridient)
    }
})

export const cardPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    calories: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    price: PropTypes.number.isRequired,
    fats: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    carbohydrates: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    image: PropTypes.string.isRequired
  })