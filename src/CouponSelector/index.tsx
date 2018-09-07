import {map, propOr} from "ramda";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

import {ICoupon, IProduct} from "../models";
import {Money} from "../Money";
import {getDiscountValue} from "../util";

import "./style.css";


export interface ICouponSelectorProps {
  items: ICoupon[];
  product: IProduct;
  selected: ICoupon | null;
  onChange(selected: ICoupon | null): void;
}


export class CouponSelector extends PureComponent<ICouponSelectorProps> {
  private readonly name: string;

  constructor(props: ICouponSelectorProps) {
    super(props);

    this.name = `RadioGroup_${Math.floor(Math.random() * 10000)}`;
  }

  public render() {
    const {items, product} = this.props;

    return (
      <Fragment>
        {this.renderItem(null, "não usar cupom")}
        {map((item: ICoupon) => this.renderItem(item, (
          <Fragment>
            {item.title}
            <span className="CouponSelector-price">
              <Money value={getDiscountValue(product, item)} />
            </span>
          </Fragment>
        )))(items)}
      </Fragment>
    )
  }

  private renderItem(value: ICoupon | null, content: ReactNode | null): ReactNode {
    const {selected, onChange} = this.props;

    return (
      <label className="CouponSelector-row" key={propOr(null, "id", value)}>
        <input
          className="CouponSelector-radio"
          type="radio"
          name={this.name}
          checked={selected === value}
          onChange={onChange.bind(null, value)}
        />
        {content}
      </label>
    );
  }
}