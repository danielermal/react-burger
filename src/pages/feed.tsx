import React, { FC } from "react";
import styles from "./styles.module.css";
import loading from "../pages/styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import { FeedItem, FeedIcon } from "../components/feed-item/feed-item";
import { TOrder } from "../services/types/data";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
} from "../services/constants/wsActions";

export const Feed: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedMessages } = useSelector((store) => store.wsReducer);
  
  const { items } = useSelector((store) => store.reducer);

  React.useEffect(() => {
    if (items.length) {
      dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });
    }

    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [items]);

  const orders = feedMessages.orders;
  const currentOrders = React.useMemo(() => {
    if (orders) {
      const newOrder = JSON.parse(JSON.stringify(orders)).map((item: TOrder) => {
        if (item.ingredients.length > 6) {
          const hiddenElements = item.ingredients.length - 6;
          item.ingredients.splice(6);
          item.ingredients[5].hidden = hiddenElements;
          return item;
        } else {
          return item;
        }
      });
      return newOrder;
    }
  }, [orders]);

  const statuses = React.useMemo(() => {
    if (orders) {
      const done: Array<number> = [];
      const pending: Array<number> = [];
      orders.forEach((item: TOrder) => {
        if (item.status === "done" && done.length < 10) {
          done.push(item.number);
        } else if (item.status !== "done" && pending.length <= 10) {
          pending.push(item.number);
        }
      });
      return { done: done, pending: pending };
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
        <section className={styles.feed_section}>
          <h1 className={styles.feed_h1}>Лента заказов</h1>
          <div className={`${styles.section} ${styles.feed}`}>
            <ul className={styles.feed_list}>
              {currentOrders.map((item: TOrder) => {
                return (
                  <li key={item._id} className={styles.link_order}>
                    <Link
                      to={`${item._id}`}
                      state={{ backgroundFeed: location }}
                      className={styles.link_order}
                    >
                      <FeedItem data={item}>
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
                  </li>
                );
              })}
            </ul>
            <div className={styles.feed_info_container}>
              <div className={styles.feed_orders_container}>
                <p className={styles.feed_orders_titles}>Готовы:</p>
                <p className={styles.feed_orders_titles}>В работе:</p>
                <ul
                  className={`${styles.feed_orders_list} ${styles.feed_orders_list_done}`}
                >
                  {statuses ? statuses.done.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : null}
                </ul>
                <ul className={styles.feed_orders_list}>
                  {statuses ? statuses.pending.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : null}
                </ul>
              </div>
              <p className={styles.feed_info_text}>Выполнено за все время:</p>
              <p className={`text text_type_digits-large ${styles.titles}`}>
                {feedMessages.total}
              </p>
              <p className={styles.feed_info_text}>Выполнено за сегодня:</p>
              <p className={`text text_type_digits-large ${styles.titles}`}>
                {feedMessages.totalToday}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
