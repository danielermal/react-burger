import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import {AppHeader} from '../app-header/app-header.js'
import styles from './styles.module.css'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js'
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js'
import {URL} from '../../utils/constants'
import { UserContext } from '../../utils/userContext.js'

export const App = () => {

  const initialState = { price: 0, id: [] };

  function reducer (state, action) {
  return {
    price: state.price + action.price,
    id: [...state.id, action.id]
    }
  }

  const [total, dispatch] = React.useReducer(reducer, initialState);

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  const getIngredients = async () =>  {
    setState({...state, hasError: false, isLoading: true})
    await fetch(`${URL}ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    
    .then((data) => {
      setState({...state, isLoading: false, data: data.data})})
    .catch(err => setState({...state, hasError: true, isLoading: false}))
  }

  React.useEffect(() => {
    document.title = 'react burger'
    getIngredients()
  }, [])

  const { data, isLoading, hasError} = state

    return (
      <UserContext.Provider value={{data, total, dispatch}}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading && !hasError && data.length &&
          <>
                <AppHeader/>
                <main>
                  <section className={styles.section}>
                    <BurgerIngredients cards={data} />
                    <BurgerConstructor cards={data}/>
                  </section>
                </main>
          </>
        }
      </UserContext.Provider>
    )
}
