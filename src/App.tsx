import * as React from "react";

import {CheckoutPage} from "./CheckoutPage";
import {Header} from "./Header";
import {MobileContainer} from "./MobileContainer";


export class App extends React.Component {
  public render() {
    return (
      <MobileContainer>
        <Header />
        <CheckoutPage id={6544} />
      </MobileContainer>
    );
  }
}
