import React, { useContext, useRef, useEffect } from 'react'
import ClientContext from '../../../context/klient/klientContext'
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import axios from 'axios'

export default function MiniCarItem({ image, title, oferta, new_price, price, package_id }) {
    const clientContext = useContext(ClientContext);
    const { getCart, getMyPackages } = clientContext
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'pill',
                label: 'buynow',
                tagline: false,
                height : 35
            },
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool Video",
                            amount: {
                                value: oferta ? new_price : price,
                                currency_code: "EUR"
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order)
                axios.post('https://physiosystem.alcodeit.com/client/buySinglePackage', { user_id: localStorage.getItem('op'), package_id, price_bought: oferta ? new_price : price }).then(res => {
                    axios.post('https://physiosystem.alcodeit.com/client/removeCart', { user_id: localStorage.getItem('op'), package_id: package_id }).then(res => {
                        getCart()
                        getMyPackages()
                    })
                })
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

    return (
        <div className="minicart-item flex fd-column ai-center">
            <div className='flex ai-center jc-spaceb' style={{ width: '100%' }} >
                <div className="minicart-item-image flex">
                    <img className="img-res" src={`https://physiosystem.alcodeit.com/files/${image}`} loading='lazy' alt="" />
                </div>
                <div className="minicart-item-texts flex fd-column ai-center">
                    <p className="fs-24 fw-medium" >{title}</p>
                    {oferta === false ?
                        <p>{price} €</p>
                        :
                        <p className="fs-18 fw-light" >{new_price} € <sup><del>{price} €</del></sup> </p>
                    }

                </div>
                <RemoveCart
                    style={{ width: '30px' }}
                    onClick={() => {
                        axios.post('https://physiosystem.alcodeit.com/client/removeCart', { user_id: localStorage.getItem('op'), package_id: package_id }).then(res => {
                            getCart()
                        })
                    }}
                />
            </div>
            <div style={{ marginTop: '20px', width: '100%' }} ref={paypal}></div>
        </div>
    )
}
