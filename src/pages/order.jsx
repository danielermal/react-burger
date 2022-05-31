import React from "react";
import styles from "./styles.module.css";
import feedItem from "../components/feed-item/feed-item.module.css";
import { FeedItem, FeedIconOrder } from "../components/feed-item/feed-item";

export const Order = () => {
    return (
        <section className={styles.order}>
            <FeedItem order={true}>
                <FeedIconOrder />
                <FeedIconOrder />
                <FeedIconOrder />
                <FeedIconOrder />
            </FeedItem>
        </section>
    )
}