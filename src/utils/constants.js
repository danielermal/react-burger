import PropTypes from 'prop-types';

export const URL = 'https://norma.nomoreparties.space/api/'

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