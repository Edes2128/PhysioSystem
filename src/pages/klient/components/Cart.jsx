import React, { useContext } from 'react'
import { ReactComponent as Separator } from '../../../images/separator.svg'
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import { ReactComponent as PayPal } from '../../../images/paypal-2.svg'
import axios from 'axios'
import ClientContext from '../../../context/klient/klientContext'

export default function Cart() {

    const clientContext = useContext(ClientContext);
    const { cart, getCart } = clientContext;

    return (
        <div className="shopping-cart" >
            <div className="shopping-cart-header flex ai-center jc-spaceb">
                <p className="shopping-cart-header-title fs-38 fw-semib" >Shopping Cart</p>
            </div>

            {cart.length !== 0 ?

                <div className="shopping-cart-form flex fd-column ai-start">
                    <p className="shopping-cart-form-title fs-22 fw-semib">Your listing</p>
                    <div className="shopping-cart-form-items flex ai-start">
                        <div className="shopping-cart-form-items-left flex fd-column ai-start">
                            {cart.map(item => (

                                <div className="shopping-cart-form-items-left-item flex ai-ceter jc-spaceb">
                                    <div className="shopping-cart-form-items-left-item-texts flex ai-center">
                                        <div className="shopping-cart-form-items-left-item-image">
                                            <img src={`http://localhost/physiosystem/server/files/${item.package[0].photo}`} className="img-res" alt="" />
                                        </div>
                                        <p className="shopping-cart-form-items-left-item-texts-title fs-22 fw-semib">{item.package[0].name}</p>
                                    </div>
                                    <div className="shopping-cart-form-items-left-item-actions flex ai-center">
                                        <p className="shopping-cart-form-items-left-actions-price fs-29 fw-medium" >$ {item.package[0].price}</p>
                                        <Separator />
                                        <RemoveCart onClick={() => {
                                            axios.post('http://localhost/physiosystem/server/client/removeCart', { user_id: localStorage.getItem('op'), package_id: item.package_id }).then(res => {
                                                getCart()
                                            })
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="shopping-cart-form-items-right flex fd-column ">
                            <p className="shopping-cart-form-items-right-title fs-22 fw-semib">Order Summary</p>
                            <div className="shopping-cart-form-items-right-details flex fd-column">
                                {cart.map(item => (
                                    <div className="shopping-cart-form-items-right-details-package flex ai-center">

                                        <div className="shopping-cart-form-items-right-details-package-image">
                                            <img src={`http://localhost/physiosystem/server/files/${item.package[0].photo}`} className="img-res" alt="" />
                                        </div>
                                        <div className="shopping-cart-form-items-right-details-package-texts flex fd-column jc-spaceb">
                                            <p className="shopping-cart-form-items-right-details-package-texts-title fs-18 fw-bold">{item.package[0].name}</p>
                                            <p className="shopping-cart-form-items-right-details-package-price fs-22 fw-medium">$ {item.package[0].price}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="shopping-cart-form-items-right-details-discount flex ai-center jc-spaceb">
                                    <p className="shopping-cart-form-items-right-details-discount-title fs-16 fw-medium">Discount</p>
                                    <p className="shopping-cart-form-items-right-details-discount-ulja fs-16 fw-medium">$ 30</p>
                                </div>

                                <div className="shopping-cart-form-items-right-details-total flex ai-center jc-spaceb">
                                    <p className="shopping-cart-form-items-right-details-total-title fs-24 fw-bold">Total </p>
                                    <p className="shopping-cart-form-items-right-details-total-vlera  fs-22 fw-semib">$ 120</p>
                                </div>

                                <button className="shopping-cart-form-items-right-details-btn flex ai-center jc-center" >
                                    <PayPal />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <p className="fs-20 fw-medium" style={{ marginTop: '60px' }} >Cart is empty!</p>
            }

        </div>
    )
}
