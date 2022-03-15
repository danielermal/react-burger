import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import {AppHeader} from '../app-header/app-header.js'
import styles from './styles.module.css'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js'
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js'
import {URL} from '../../utils/constants'

export const App = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  const getIngredients = async () =>  {
    setState({...state, hasError: false, isLoading: true})
    await fetch(`${URL}ingredients`)
    .then((res) => {
      console.log(res.ok)
      return res.json()
    })
    
    .then((data) => {
      const bun = []
      const main = []
      const sauce = []
    
    data.data.forEach((ingredient) => {
        if (ingredient.type === "bun") {
            bun.push(ingredient)
        }
        else if (ingredient.type === "main") {
            main.push(ingredient)
        }
        else {
            sauce.push(ingredient)
        }
    })
      setState({...state, isLoading: false, data: data.data, bun, main, sauce})})
    .catch(err => setState({...state, hasError: true, isLoading: false}))
  }

  React.useEffect(() => {
    document.title = 'react burger'
    getIngredients()
  }, [])

  const { data, isLoading, hasError, bun, main, sauce } = state

    return (
      <>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading && !hasError && data.length &&
          <>
                <AppHeader/>
                <main>
                  <section className={styles.section}>
                    <BurgerIngredients bun={bun} sauce={sauce} main={main} />
                    <BurgerConstructor cards={data}/>
                  </section>
                </main>
          </>
        }
      </>
    )
}
