import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import {AppHeader} from '../app-header/app-header.js'
import styles from './styles.module.css'
import {BurgerIngridients} from '../burger-ingridients/burger-ingridients.js'
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js'
import { data } from '../../utils/data.js'
import {bun, sauce, main} from '../../utils/types.js'

class App extends React.Component {
  componentDidMount() {
    document.title = 'react burger'
  }
  render() {
    return (
      <>
        <AppHeader/>
        <main>
          <section className={styles.section}>
            <BurgerIngridients bun={bun} sauce={sauce} main={main} />
            <BurgerConstructor cards={data}/>
          </section>
        </main>
      </>
    )
  }
}

export default App;
