import React from "react";
import styles from "./styles.module.css";
import { FeedItem, FeedIcon } from "../components/feed-item/feed-item";

export const ProfileOrders = () => {
  return (
    <div className={styles.feed_list}>
      <FeedItem profile={true}>
        <FeedIcon />
        <FeedIcon />
      </FeedItem>
      <FeedItem profile={true}>
        <FeedIcon />
        <FeedIcon />
      </FeedItem>
    </div>
  );
};
