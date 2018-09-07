import {Component} from "react";

import {ICoupon, IProduct} from "./models";


export const getDiscountValue = (product: IProduct, coupon: ICoupon) => {
  return -product.price * (coupon.discount / 100);
};


export const setStateP = <T, K extends keyof T>(
  self: Component<any, T>,
  state: Pick<T, K>,
): Promise<void> => new Promise(resolve => {
  self.setState(state, resolve);
});