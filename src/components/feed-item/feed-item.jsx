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
          {`#${data.number}`}
        </span>
        {!order ? <span className={feedItem.data}>{data.createdAt}</span> : <></>}
      </li>
      <li>
        <p className={!order ? feedItem.name : `${feedItem.name_order}`}>
          {data.name}
        </p>
      </li>
      {profile ? (
        <li className={feedItem.in_profile}>
          {data.status === 'done' ? <span className={feedItem.done}>Выполнен</span> : 'Создан' }
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
            <span className={feedItem.price}>{data.price}</span>
            <CurrencyIcon type="primary" />
          </span>
        ) : (
          <></>
        )}
      </li>
      {order ? 
      <li className={feedItem.numbers}>
        <span className={feedItem.data}>{data.createdAt}</span>
        <span className={feedItem.price_container}>
        <span className={feedItem.price}>{data.price}</span>
        <CurrencyIcon type="primary" />
      </span>
      </li>
     : <></>}
    </ul>
  );
};

export const FeedIcon = ({z, icon, hiddenIngredients=false}) => {
  return (
    <article className={feedItem.icon_container} style={{ zIndex: `${z}` }}>
      <div
        className={feedItem.icon}
        style={{
          backgroundImage:
            `url(${icon})`,
        }}
      >
        {hiddenIngredients && <span className={feedItem.hidden}>{`+${hiddenIngredients}`}</span>}
      </div>
    </article>
  );
};

export const FeedIconOrder = ({data}) => {
  return (
    <article className={feedItem.icon_container_order}>
      <img
        src={data.image}
        alt={data.name}
        className={feedItem.icon_order}
      />
      <h3 className={feedItem.icon_name}>{data.name}</h3>
      <span className={feedItem.price_container}>
        <span className={feedItem.price}>{`${data.count} x ${data.price}`}</span>
        <CurrencyIcon type="primary" />
      </span>
    </article>
  );
};
