import * as React from "react";
import {ReactNode, SFC} from "react";

import {ModalContainer} from "../Modal";

import "./style.css";


export const MobileContainer: SFC<{
  children?: ReactNode,
}> = ({children}) => (
  <div className="MobileContainer">
    <ModalContainer>
      {children}
    </ModalContainer>
  </div>
);