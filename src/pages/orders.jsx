import React from "react";
import styles from "./styles.module.css";
import loading from "../pages/styles.module.css";
import { FeedItem, FeedIcon } from "../components/feed-item/feed-item";
import { useSelector,useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { WS_ORDER_CONNECTION_START, WS_ORDER_CONNECTION_CLOSED } from "../services/actions/wsActions";
import { getCookie } from "../utils/constants";

export const ProfileOrders = () => {

  const {orders} = useSelector((store) => store.wsReducer.ordersMessages);
  const location = useLocation()
  const dispatch = useDispatch()
  const { items } = useSelector(
    (store) => store.reducer
  );

  React.useEffect(() => {
    if (items.length) {
      dispatch({ type: WS_ORDER_CONNECTION_START, payload: `?token=${getCookie("accessToken")}`});
    }
    
    return () => {
      dispatch({ type: WS_ORDER_CONNECTION_CLOSED})
    }
  }, [items]);

  const currentOrders = React.useMemo(() => {
    if (orders) {
      const newOrder = JSON.parse(JSON.stringify(orders)).map((item) => {
        if (item.ingredients.length > 12) {
          const hiddenElements = item.ingredients.length - 12;
          item.ingredients.splice(12);
          item.ingredients[11].hidden = hiddenElements;
          return item;
        } else {
          return item;
        }
      });
      return newOrder;
    }
  }, [orders]);

  return (
    <>
      {!currentOrders && (
        <span>
          Загрузка<span className={loading.loading}>...</span>
        </span>
      )}
      {currentOrders && (
        <div className={styles.feed_list}>
          {currentOrders.map((item) => {
            return (
              <Link to={`${item._id}`} state={{backgroundOrder: location}} key={item._id} className={styles.link_order}>
              <FeedItem data={item} profile={true}>
                {item.ingredients.map((icon, index) => {
                  return (
                    <FeedIcon
                      key={index}
                      z={item.ingredients.length - index}
                      icon={icon.image}
                      hiddenIngredients={icon.hidden}
                    />
                  );
                })}
              </FeedItem>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
