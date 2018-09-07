import * as React from "react";
import {SFC} from "react";

import {IProduct} from "../models";

import "./style.css";


export const Product: SFC<IProduct> = ({image, title}) => (
  <img
    className="Product"
    src={image}
    alt={title}
    title={title}
  />
);