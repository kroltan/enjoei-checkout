import {propOr} from "ramda";
import * as React from "react";
import {Fragment, PureComponent, SFC} from "react";

import {Button} from "../Button";
import {CartIcon} from "../CartIcon";
import {CouponSelector} from "../CouponSelector";
import {FetchApi} from "../FetchApi";
import {Modal} from "../Modal";
import {ICheckout, ICoupon, IProduct} from "../models";
import {PriceItem} from "../PriceItem";
import {Product} from "../Product";
import {SectionLabel} from "../SectionLabel";
import {Spinner} from "../Spinner";
import {getDiscountValue, setStateP} from "../util";

import "./style.css";


const CancellationModal: SFC<{}> = (_) => (
  <Fragment>
    <CartIcon className="CheckoutPage-cart-cancel" />
    <h3>compra cancelada</h3>
    <p>
      o pedido não foi enviado
      <br />
      e você não será cobrado
    </p>
  </Fragment>
);

const ConfirmationModal: SFC<{}> = (_) => (
  <Fragment>
    <CartIcon className="CheckoutPage-cart-confirm" />
    <h3>compra confirmada</h3>
    <p>
      enviaremos atualizações sobre
      <br />
      o pedido para o seu email
    </p>
  </Fragment>
);


export interface ICheckoutPageProps {
  id: number;
}


export interface ICheckoutPageState {
  confirming: boolean;
  selectedCoupon: ICoupon | null;
  state: "canceled" | "confirmed" | null;
}


export class CheckoutPage extends PureComponent<ICheckoutPageProps, ICheckoutPageState> {
  public state = {
    confirming: false,
    selectedCoupon: null,
    state: null,
  };

  public render() {
    const {id} = this.props;
    const {confirming, selectedCoupon, state} = this.state;

    return (
      <FetchApi
        path={`/api/checkouts/${id.toString()}`}
        params={{couponId: propOr(null, "id", selectedCoupon)}}
      >
        {({loading, result}: {
          loading: boolean,
          result: {
            product: IProduct,
            checkout: ICheckout,
          } | null,
        }) => {
          const waiting = loading || confirming;

          return (
            <div className="CheckoutPage">
              <div className="CheckoutPage-body">
                <Product {...propOr(null, "product", result)}/>
                {result != null && <Fragment>
                  <SectionLabel>
                    cupons
                  </SectionLabel>
                  <CouponSelector
                    items={result.checkout.availableCoupons}
                    product={result.product}
                    selected={propOr(null, "id", selectedCoupon)}
                    onChange={this.selectCoupon}
                  />

                  <SectionLabel>
                    resumo
                  </SectionLabel>
                  <PriceItem description="valor original" value={result.product.price}/>
                  {selectedCoupon != null && <PriceItem
                    className="CheckoutPage-couponPrice"
                    description="cupom"
                    discount={true}
                    value={getDiscountValue(result.product, selectedCoupon!)}
                  />}
                  <PriceItem description="frete" value={result.checkout.shippingPrice}/>
                  <PriceItem
                    className="CheckoutPage-total"
                    description={<Fragment>
                      total
                      {loading && <Spinner/>}
                    </Fragment>}
                    value={loading ? null : result.checkout.totalPrice}
                  />
                </Fragment>}
              </div>
              <div className="CheckoutPage-actions">
                <Button onClick={this.cancel} disabled={waiting}>
                  cancelar
                </Button>
                <Button
                  onClick={this.confirm(propOr(null, "checkout", result))}
                  primary={true}
                  disabled={waiting}
                >
                  confirmar
                  {confirming && <Spinner/>}
                </Button>
              </div>
              {state === "canceled" && <Modal dismiss={this.dismiss}>
                <CancellationModal/>
              </Modal>}
              {state === "confirmed" && <Modal dismiss={this.dismiss}>
                <ConfirmationModal/>
              </Modal>}
            </div>
          );
        }}
      </FetchApi>
    );
  }

  private selectCoupon = (selectedCoupon: ICoupon) => this.setState({selectedCoupon});

  private cancel = () => this.setState({state: "canceled"});

  private confirm = (checkout: ICheckout) => async () => {
    await setStateP(this, {confirming: true});
    await fetch(`/api/checkouts/${checkout.id}`, {
      body: JSON.stringify(checkout),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    await setStateP(this, {
      confirming: false,
      state: "confirmed",
    });
  };

  private dismiss = () => this.setState({state: null});
}
