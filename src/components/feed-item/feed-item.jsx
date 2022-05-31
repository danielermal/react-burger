import React from "react";
import feedItem from "./feed-item.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

export const FeedItem = ({
  data,
  children,
  profile = false,
  order = false,
}) => {
  return (
    <ul
      className={
        !order ? feedItem.item : `${feedItem.item} ${feedItem.in_order}`
      }
    >
      <li className={feedItem.numbers}>
        <span
          className={
            !order
              ? feedItem.number
              : `${feedItem.number} ${feedItem.number_order}`
          }
        >
          123
        </span>
        {!order ? <span className={feedItem.data}>1234</span> : <></>}
      </li>
      <li>
        <p className={!order ? feedItem.name : `${feedItem.name_order}`}>
          vcvcvc
        </p>
      </li>
      {profile ? (
        <li className={feedItem.in_profile}>
          <span>создан</span>
        </li>
      ) : (
        <></>
      )}
      {order ? (
        <>
          <li className={feedItem.done}>
            <span>Выполнен</span>
          </li>
          <li className={feedItem.about_order}>
            <span>Состав</span>
          </li>
        </>
      ) : (
        <></>
      )}

      <li className={feedItem.ingredients}>
        <div className={!order ? feedItem.icons : feedItem.icons_order}>
          {children}
        </div>
        {!order ? (
          <span className={feedItem.price_container}>
            <span className={feedItem.price}>432423</span>
            <CurrencyIcon type="primary" />
          </span>
        ) : (
          <></>
        )}
      </li>
      {order ? 
      <li className={feedItem.numbers}>
        <span className={feedItem.data}>1234</span>
        <span className={feedItem.price_container}>
        <span className={feedItem.price}>4423</span>
        <CurrencyIcon type="primary" />
      </span>
      </li>
     : <></>}
    </ul>
  );
};

export const FeedIcon = ({ z }) => {
  return (
    <article className={feedItem.icon_container} style={{ zIndex: z }}>
      <div
        className={feedItem.icon}
        style={{
          backgroundImage:
            "url(https://kartinkin.net/uploads/posts/2022-03/1648067648_1-kartinkin-net-p-grustnie-kotiki-kartinki-1.jpg)",
        }}
      >
        <h3></h3>
      </div>
    </article>
  );
};

export const FeedIconOrder = () => {
  return (
    <article className={feedItem.icon_container_order}>
      <img
        src="https://kartinkin.net/uploads/posts/2022-03/1648067648_1-kartinkin-net-p-grustnie-kotiki-kartinki-1.jpg"
        alt=""
        className={feedItem.icon_order}
      />
      <h3 className={feedItem.icon_name}>булочка</h3>
      <span className={feedItem.price_container}>
        <span className={feedItem.price}>432423</span>
        <CurrencyIcon type="primary" />
      </span>
    </article>
  );
};
