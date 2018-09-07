import {Component} from "react";

import {ICheckout, ICoupon, IProduct} from "./models";


export const getDiscountValue = (product: IProduct, coupon: ICoupon) => {
  return -product.price * (coupon.discount / 100);
};


export const getTotal = (checkout: ICheckout, product: IProduct, coupon: ICoupon | null) => {
  if (coupon == null) {
    return checkout.totalPrice;
  } else {
    return checkout.totalPrice + getDiscountValue(product, coupon);
  }
};


export const setStateP = <T, K extends keyof T>(
  self: Component<any, T>,
  state: Pick<T, K>,
): Promise<void> => new Promise(resolve => {
  self.setState(state, resolve);
});