import React from "react";
import styles from "./styles.module.css";
import feedItem from "../components/feed-item/feed-item.module.css";
import { FeedItem, FeedIconOrder } from "../components/feed-item/feed-item";
import { useParams } from "react-router-dom";

export const Order = ({orders}) => {
  const {id} = useParams()
  const currentOrder = React.useMemo(() => {
        const order = orders.find(order => order._id === id)
        const counts = []
        const newOrder ={...order}
        newOrder.ingredients.forEach((ingredient) => {
            if (!counts.includes(ingredient)) {
                ingredient.count = 1
                counts.push(ingredient)
            }
            else {
                counts.forEach((count) => {
                    if (count._id === ingredient._id) {
                        count.count +=1
                    }
                })
            }
        })
        newOrder.ingredients = counts
        return newOrder
  }, [orders])
    return (
        <>
        {currentOrder &&
            <section className={styles.order}>
            <FeedItem order={true} data={currentOrder} >
                {currentOrder.ingredients.map((item, index) =>
                <FeedIconOrder key={index} data={item} />
                )}
            </FeedItem>
        </section>
        }
        </>
    )
}