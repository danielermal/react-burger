import React, { FC } from "react";
import ingredient from "./ingredient.module.css";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { INewItem } from "../../services/types/data";

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { items } = useSelector((store) => store.reducer);
  const currentIngredient: INewItem | undefined = React.useMemo(
    () => items.find((item: INewItem) => item._id === id),
    [id, items]
  );

  return (  currentIngredient ? 
    <>
      <img src={currentIngredient.image} className={ingredient.img} />
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
    : null
  );
};
