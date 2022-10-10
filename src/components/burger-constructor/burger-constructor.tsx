import React, { FC } from "react";
import burgerConstructor from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  getOrder,
  sortIngredients,
  addIngredients,
} from "../../services/actions";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { deleteItemAction } from "../../services/actions";
import { INewItem } from "../../services/types/data";
import { useNavigate } from "react-router-dom";

interface IListItem {
  item: INewItem;
  index: number;
}

interface IBun {
  bun: INewItem;
  type: "top" | "bottom";
  position: string;
}

const Bun: FC<IBun> = ({ bun, type, position }) => {
  return (
    <article className={burgerConstructor.bun}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${position}`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </article>
  );
};

const ListItem: FC<IListItem> = ({ item, index }) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  interface IItemDrop extends INewItem {
    index: number;
  }

  const deleteItem = () => {
    dispatch(deleteItemAction(item));
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item: IItemDrop) {
      dispatch(sortIngredients(item.index, index));
    },
  });

  drag(drop(ref));

  return (
    <article
      className={burgerConstructor.article}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={deleteItem}
      />
    </article>
  );
};

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const { constructorItems, bun } = useSelector((store) => store.reducer);
  const totalPrice = React.useMemo(() => {
    return (
      constructorItems.reduce(
        (acc: number, item: INewItem): number => acc + item.price,
        0
      ) + (typeof bun?.price === "number" ? bun?.price : 0)
    );
  }, [constructorItems, bun]);

  const totalId = React.useMemo((): Array<string> => {
    const itemsId = constructorItems.map((item: INewItem): string => item._id);
    return [...itemsId, bun?._id ? bun._id : ""];
  }, [constructorItems, bun]);

  const [state, setState] = React.useState({
    overlay: false,
  });

  const { isAuth } = useSelector((store) => store.routeReducer);

  const navigate = useNavigate();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addItem(item);
    },
  });

  const addItem = (item: unknown) => {
    dispatch(addIngredients(item));
  };

  const closeModal = () => {
    setState({ ...state, overlay: false });
  };

  const openModalOrder = () => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    } else {
      setState({ ...state, overlay: true });
      dispatch(getOrder(totalId));
    }
  };

  const { order, orderRequest, orderFailed } = useSelector(
    (store) => store.reducer
  );

  return (
    <div className={burgerConstructor.container}>
      <div
        className={
          !isHover
            ? burgerConstructor.burger
            : `${burgerConstructor.burger} ${burgerConstructor.burger_hover}`
        }
        ref={dropTarget}
      >
        {bun?.price && <Bun bun={bun} type="top" position="(верх)" />}
        <div className={burgerConstructor.ingridients}>
          {constructorItems.map((item: INewItem, index: number) => (
            <ListItem key={item.uuid} item={item} index={index} />
          ))}
        </div>
        {bun?.price && <Bun bun={bun} type="bottom" position="(низ)" />}
      </div>
      <div className={burgerConstructor.total}>
        <p className="mr-10">
          <span className="text text_type_digits-medium mr-2">
            {totalPrice ? totalPrice : 0}
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="large"
          onClick={openModalOrder}
          disabled={bun?.price && constructorItems.length ? false : true}
          htmlType="button"
        >
          {bun?.price && constructorItems.length
            ? "Оформить заказ"
            : "Перетащите булку и ингредиенты"}
        </Button>
        {state.overlay && (
          <Modal onClose={closeModal} title={""}>
            {orderRequest && (
              <span>
                Загрузка<span className={burgerConstructor.loading}>...</span>
              </span>
            )}
            {orderFailed && "Произошла ошибка"}
            {!orderRequest && !orderFailed && <OrderDetails number={order} />}
          </Modal>
        )}
      </div>
    </div>
  );
};
