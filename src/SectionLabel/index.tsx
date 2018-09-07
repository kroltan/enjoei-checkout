import * as React from "react";
import {ReactNode, SFC} from "react";

import "./style.css";


export const SectionLabel: SFC<{
  children: ReactNode | null,
}> = ({children}) => (
  <div className="SectionLabel">
    {children}
  </div>
);