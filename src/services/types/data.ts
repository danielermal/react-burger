import { Pathname } from "react-router-dom";

export interface IItem {
  count: number;
  _id: string;
  name: string;
  type: string;
  proteins: string | number;
  calories: string | number;
  price: number;
  fat: string | number;
  carbohydrates: string | number;
  image: string;
  uuid?: string;
}

export interface INewItem extends IItem {
  count: number;
  hidden?: number
}

export type TOrder = {
  createdAt: string;
  ingredients: Array<INewItem>;
  name: string;
  number: number;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export interface ILocation {
  state: {
    background?: Location
    backgroundOrder?: Location
    backgroundFeed?: Location
    from?: {pathname: string}
  }
}

export type TOrders = {
  success: boolean;
  total: number | null;
  totalToday: number | null
  orders: Array<TOrder> | null
}
