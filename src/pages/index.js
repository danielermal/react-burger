import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "../components/app-header/app-header";
import styles from "./styles.module.css";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";

export const Index = () => {

  return (
    <>
          <AppHeader />
          <main>
            <section className={styles.section}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </section>
          </main>
    </>
  );
};
