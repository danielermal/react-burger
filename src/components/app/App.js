import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'    
import {AppHeader} from '../app-header/app-header.js'
import styles from './styles.module.css'
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js'
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/index.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export const App = () => {

  const { items, itemsRequest, itemsFailed} = useSelector(store => store.reducer)
  
  const dispatch = useDispatch()

  React.useEffect(() => {
      document.title = 'react burger'
      dispatch(getIngredients())
  }, [dispatch])

    return (
      <>
        {itemsRequest && 'Загрузка...'}
        {itemsFailed && 'Произошла ошибка'}
        {!itemsRequest && !itemsFailed && items.length && 
          <>
                <AppHeader/>
                <main>
                  <section className={styles.section}>
                    <DndProvider backend={HTML5Backend}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </DndProvider>
                  </section>
                </main>
          </>
        }
        </>
    )
}
