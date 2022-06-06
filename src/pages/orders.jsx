import React from "react";
import styles from "./styles.module.css";
import loading from "../pages/styles.module.css";
import { FeedItem, FeedIcon } from "../components/feed-item/feed-item";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const ProfileOrders = () => {

  const {orders} = useSelector((store) => store.wsReducer.ordersMessages);
  const location = useLocation()
  return (
    <>
      {!orders && (
        <span>
          Загрузка<span className={loading.loading}>...</span>
        </span>
      )}
      {orders && (
        <div className={styles.feed_list}>
          {orders.map((item) => {
            return (
              <Link to={`${item._id}`} state={{backgroundOrder: location}} key={item._id} className={styles.link_order}>
              <FeedItem data={item} profile={true}>
                {item.ingredients.map((icon, index) => {
                  return (
                    <FeedIcon
                      key={index}
                      z={item.ingredients.length - index}
                      icon={icon.image}
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
