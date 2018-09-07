import * as React from "react";
import {SFC} from "react";

import logo from "./logo.svg";
import "./style.css";


export const Header: SFC<{}> = ({}) => (
  <div className="Header">
    <img src={logo} alt="enjoei" />
  </div>
);