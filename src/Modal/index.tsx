import * as React from "react";
import {Fragment, MouseEvent, PureComponent, ReactNode, RefObject, SFC} from "react";
import * as ReactDOM from "react-dom";

import "./style.css";


interface IModalContext {
  modalRoot?: RefObject<HTMLDivElement>;
}


const {Consumer, Provider} = React.createContext<IModalContext>({});


export class ModalContainer extends PureComponent {
  private ref: RefObject<HTMLDivElement> = React.createRef();

  public render() {
    return (
      <Fragment>
        <div className="ModalContainer" ref={this.ref} />
        <Provider value={{modalRoot: this.ref}}>
          {this.props.children}
        </Provider>
      </Fragment>
    );
  }
}


export const Modal: SFC<{
  children?: ReactNode,
  dismiss?: (event: MouseEvent<HTMLDivElement>) => void,
}> = ({children, dismiss}) => (
  <Consumer>
    {({modalRoot}) => {
      if (modalRoot == null || modalRoot.current == null) {
        return null;
      }

      return (
        ReactDOM.createPortal(
          <Fragment>
            <div className="Modal-backdrop" onClick={dismiss} />
            <div className="Modal">
              {children}
            </div>
          </Fragment>,
          modalRoot!.current!,
        )
      );
    }}
  </Consumer>
);