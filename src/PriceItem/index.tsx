import * as React from "react";
import {ReactNode, SFC} from "react";

import {Money} from "../Money";

import "./style.css";


export const PriceItem: SFC<{
  className?: string,
  description?: ReactNode,
  value?: number,
  discount?: boolean,
}> = ({className, description, discount, value}) => {
  if (description == null || value == null) {
    return null;
  }

  return (
    <div className={`PriceItem ${className}`}>
      <span className="PriceItem-label">
        {description}
      </span>
      <Money value={value} />
    </div>
  );
};