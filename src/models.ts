export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}


export interface ICheckout {
  availableCoupons: ICoupon[];
  id: number;
  productId: number;
  shippingPrice: number;
  totalPrice: number;
}


export interface ICoupon {
  id: number;
  title: string;
  discount: number;
}