import React, { ReactNode, FC } from "react";
import feedItem from "./feed-item.module.css";
import { INewItem } from "../../services/types/data";
import { TOrder } from "../../services/types/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TFeedItem = {
  data: TOrder;
  children: ReactNode;
  profile?: boolean;
  order?: boolean
}

type TData = {
  data: INewItem
}

type TIcon = {
  z: number;
  icon: string;
  hiddenIngredients?: number | boolean;
}

export const FeedItem: FC<TFeedItem> = ({
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

export const FeedIcon: FC<TIcon> = ({z, icon, hiddenIngredients=false}) => {
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

export const FeedIconOrder: FC<TData> = ({data}) => {
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
