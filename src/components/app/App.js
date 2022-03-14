import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import {AppHeader} from '../app-header/app-header.js'
import styles from './styles.module.css'
import {BurgerIngridients} from '../burger-ingridients/burger-ingridients.js'
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js'
import {URL} from '../../utils/types'

export const App = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  const getIngridients = async () =>  {
    setState({...state, hasError: false, isLoading: true})
    await fetch(URL)
    .then(res => res.json())
    .then((data) => {
      const bun = []
      const main = []
      const sauce = []
    
    data.data.forEach((ingridient) => {
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
      setState({...state, isLoading: false, data: data.data, bun, main, sauce})})
    .catch(err => setState({...state, hasError: true, isLoading: false}))
  }

  React.useEffect(() => {
    document.title = 'react burger'
    getIngridients()
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
                    <BurgerIngridients bun={bun} sauce={sauce} main={main} />
                    <BurgerConstructor cards={data}/>
                  </section>
                </main>
          </>
        }
      </>
    )
}
