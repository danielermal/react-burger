import React from "react";
import ingredient from "./ingredient.module.css";
import { currentIngredientPropTypes } from "../../utils/constants";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
  const { id } = useParams();
  const { items } = useSelector((store) => store.reducer);
  const currentIngredient = React.useMemo(
    () => items.find((item) => item._id === id),
    [id, items]
  );

  return (
    <>
      <img src={currentIngredient.image_large} className={ingredient.img} />
      <h2 className={ingredient.h2}>{currentIngredient.name}</h2>
      <ul className={`${ingredient.list} mt-8 mb-15`}>
        <li className={ingredient.item}>
          <span className={ingredient.name}>Калории,ккал</span>
          <span className={ingredient.value}>{currentIngredient.calories}</span>
        </li>
        <li className={ingredient.item}>
          <span className={ingredient.name}>Белки, г</span>
          <span className={ingredient.value}>{currentIngredient.proteins}</span>
        </li>
        <li className={ingredient.item}>
          <span className={ingredient.name}>Жиры, г</span>
          <span className={ingredient.value}>{currentIngredient.fat}</span>
        </li>
        <li className={ingredient.item}>
          <span className={ingredient.name}>Углеводы, г</span>
          <span className={ingredient.value}>
            {currentIngredient.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
};
