import React from "react";
import burgerConstructor from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { cardPropTypes } from "../../utils/constants";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { Typography } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, sortIngredients, addIngredients } from "../../services/actions";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { DELETE_ITEM } from "../../services/actions";
import { useNavigate } from "react-router-dom";

const Bun = ({ bun, type, position }) => {
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

const ListItem = ({ item, index }) => {
  const ref = React.useRef(null);

  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const deleteItem = () => {
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item) {
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

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { constructorItems, bun } = useSelector((store) => store.reducer);
  const totalPrice =
    constructorItems.reduce((acc, item) => acc + item.price, 0) +
    (typeof bun.price == "number" ? bun.price : 0);

  const totalId = React.useMemo(() => {
    const itemsId = constructorItems.map(item => item._id)
    return [...itemsId, bun._id]
  }, [constructorItems, bun])

  const [state, setState] = React.useState({
    overlay: false,
  });

  const {isAuth} = useSelector((store) => store.routeReducer);

  const navigate = useNavigate()

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addItem(item);
    },
  });

  const addItem = (item) => {
    dispatch(addIngredients(item));
  };

  const closeModal = () => {
    setState({ ...state, overlay: false });
  };

  const openModalOrder = () => {
    if (!isAuth) {
      navigate('/login', {replace: true})
    }
    else {
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
        {bun.price && <Bun bun={bun} type="top" position="(верх)" />}
        <div className={burgerConstructor.ingridients}>
          {constructorItems.map((item, index) => (
            <ListItem key={item.uuid} item={item} index={index} id={item.uuid} />
          ))}
        </div>
        {bun.price && <Bun bun={bun} type="bottom" position="(низ)" />}
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
          disabled={bun.price && constructorItems.length ? false : true}
        >
          {bun.price && constructorItems.length
            ? "Оформить заказ"
            : "Перетащите булку и ингредиенты"}
        </Button>
        {state.overlay && (
          <Modal onClose={closeModal} title={""}>
            {orderRequest && <span>Загрузка<span className={burgerConstructor.loading}>...</span></span>}
            {orderFailed && "Произошла ошибка"}
            {!orderRequest && !orderFailed && <OrderDetails number={order} />}
          </Modal>
        )}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  item: cardPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};

Bun.propTypes = {
  bun: cardPropTypes.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
