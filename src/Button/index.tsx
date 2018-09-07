import * as React from "react";
import {MouseEvent, ReactNode, SFC} from "react";

import "./style.css";


export const Button: SFC<{
  children?: ReactNode,
  disabled?: boolean,
  primary?: boolean,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
}> = ({children, disabled = false, onClick, primary = false}) => (
  <button
    className={`Button ${primary ? "primary" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);