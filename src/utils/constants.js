import PropTypes from 'prop-types';

export const URL = 'https://norma.nomoreparties.space/api/'

export const wsURL = 'wss://norma.nomoreparties.space/orders'

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

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

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

  export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
  }
  
// deleteCookie('accessToken')