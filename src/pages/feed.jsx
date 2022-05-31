import React from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FeedItem, FeedIcon } from "../components/feed-item/feed-item";

export const Feed = () => {

  return (
    <section className={styles.feed_section}>
    <h1 className={styles.feed_h1}>
        Лента заказов
    </h1>
      <div className={`${styles.section} ${styles.feed}`}>
        <ul className={styles.feed_list}>
            <li>
                <FeedItem>
                    <FeedIcon z={5} />
                    <FeedIcon z={2}/>
                </FeedItem>
            </li>
            
        </ul>
      </div>
    </section>
  );
};
