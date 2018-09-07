import * as React from "react";
import {SFC} from "react";

import "./style.css";


export const Money: SFC<{
  value?: number | null
}> = ({value}) => {
  if (value == null) {
    return null;
  }

  return (
    <div className={`Money ${value < 0 ? "discount" : ""}`}>
      {value < 0 ? "- " : null}
      R$ {Math.abs(value).toFixed(2)}
    </div>
  );
};