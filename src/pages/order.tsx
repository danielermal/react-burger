import React, { FC } from "react";
import styles from "./styles.module.css";
import { FeedItem, FeedIconOrder } from "../components/feed-item/feed-item";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import { TOrder, IItem } from "../services/types/data";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_START,
  WS_ORDER_CONNECTION_CLOSED,
} from "../services/constants/wsActions";
import { getCookie } from "../utils/constants";

type TOrderComponent = {
  orders: Array<TOrder>
}

export const Order: FC<TOrderComponent> = ({ orders }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.reducer);
  const location = useLocation();

  React.useEffect(() => {
    if (items.length && location.pathname.includes("orders/")) {
      dispatch({ type: WS_ORDER_CONNECTION_START, payload: `?token=${getCookie("accessToken")}`});

      return () => {
        dispatch({ type: WS_ORDER_CONNECTION_CLOSED });
      };
    }

    if (items.length && location.pathname.includes("feed/")) {
      dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });

      return () => {
        dispatch({ type: WS_FEED_CONNECTION_CLOSED });
      };
    }
  }, [items]);

  const currentOrder = React.useMemo(() => {
      if (orders) {
        const order = orders.find((order) => order._id === id);
        if (order) {
          const counts: Array<IItem> = [];
          const newOrder = { ...order };
          newOrder.ingredients.forEach((ingredient) => {
            if (!counts.includes(ingredient)) {
              ingredient.count = 1;
              counts.push(ingredient);
            } else {
              counts.forEach((count) => {
                if (count._id === ingredient._id) {
                  count.count += 1;
                }
              });
            }
          });
          newOrder.ingredients = counts;
          return newOrder;
      }
    }
  }, [orders]);

  return (
    <>
      {currentOrder && (
        <section className={styles.order}>
          <FeedItem order={true} data={currentOrder}>
            {currentOrder.ingredients.map((item, index) => (
              <FeedIconOrder key={index} data={item} />
            ))}
          </FeedItem>
        </section>
      )}
    </>
  );
};
