import React, { useContext, useEffect, useRef } from 'react'
import { ReactComponent as Separator } from '../../../images/separator.svg'
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import axios from 'axios'
import ClientContext from '../../../context/klient/klientContext'
import LoadingContext from '../../../context/loading/LoadingContext'
import { Link } from 'react-router-dom'

export default function Cart() {

    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const clientContext = useContext(ClientContext);
    const { cart, getCart } = clientContext;

    const reducer = (accumulator, curr) => accumulator + curr;
    if (cart.length !== 0) {
        var packages = cart.map(item => item.package)
        var cmimetfillestare = cart.map(item => parseInt(item.package.price))
        var cmimiPaOfert = cmimetfillestare.reduce(reducer)


        var packagesnoOffer = cart.filter(item => item.oferta === false);
        if (packagesnoOffer.length !== 0) {
            var prices = packagesnoOffer.map(cmim => parseInt(cmim.package.price));
            var total = prices.reduce(reducer);
        }
        var packagesOffer = cart.filter(item => item.oferta !== false);
        if (packagesOffer.length !== 0) {
            var newprices = packagesOffer.map(item => item.oferta.new_price);
            var newTotal = newprices.reduce(reducer)
        }

        var finalTotal = (newTotal === undefined ? 0 : newTotal) + (total === undefined ? 0 : total);

    }
    const paypal = useRef()

    useEffect(() => {
        getCart()
    }, [])
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool Video",
                            amount: {
                                value: finalTotal,
                                currency_code: "EUR"
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order)
                axios.post('https://physiosystem.alcodeit.com/client/buyPackage', { user_id: localStorage.getItem('op'), packages, total: finalTotal }).then(res => {
                    if (res.status === 200) {
                        axios.post('https://physiosystem.alcodeit.com/client/removeAllWishlist', { user_id: localStorage.getItem('op') })
                        setShow(true)
                        axios.post('https://physiosystem.alcodeit.com/client/removeAllCart', { user_id: localStorage.getItem('op') }).then(res => {
                            if (res.status === 200) {
                                getCart()
                                setShow(false)
                            }
                        })
                    }
                })
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

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
                                <div key={item.id} className="shopping-cart-form-items-left-item flex ai-ceter jc-spaceb">
                                    <div className="shopping-cart-form-items-left-item-texts flex ai-center">
                                        <div className="shopping-cart-form-items-left-item-image">
                                            <img src={`https://physiosystem.alcodeit.com/files/${item.package.photo}`} className="img-res" alt="" loading='lazy' />
                                        </div>
                                        <p className="shopping-cart-form-items-left-item-texts-title fs-22 fw-semib">{item.package.name}</p>
                                    </div>
                                    <div className="shopping-cart-form-items-left-item-actions flex ai-center">

                                        {item.oferta === false ?
                                            <p className="shopping-cart-form-items-left-actions-price fs-29 fw-medium" >
                                                €   {item.package.price}
                                            </p>
                                            :
                                            <p className="shopping-cart-form-items-left-actions-price fs-29 fw-medium" >
                                                € {item.oferta.new_price}
                                                <sup className="fs-18 fw-light" ><del>€ {item.package.price}</del></sup>
                                            </p>
                                        }
                                        <Separator />
                                        <RemoveCart onClick={() => {
                                            setShow(true)
                                            axios.post('https://physiosystem.alcodeit.com/client/removeCart', { user_id: localStorage.getItem('op'), package_id: item.package_id }).then(res => {
                                                if (res.status === 200) {
                                                    setTimeout(() => setShow(false), 1000)
                                                    getCart()
                                                }
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
                                    <div key={item.id} className="shopping-cart-form-items-right-details-package flex ai-center">

                                        <div className="shopping-cart-form-items-right-details-package-image">
                                            <img src={`https://physiosystem.alcodeit.com/files/${item.package.photo}`} loading='lazy' className="img-res" alt="" />
                                        </div>
                                        <div className="shopping-cart-form-items-right-details-package-texts flex fd-column jc-spaceb">
                                            <p className="shopping-cart-form-items-right-details-package-texts-title fs-18 fw-bold">{item.package.name}</p>
                                            {item.oferta === false ?
                                                <p className="shopping-cart-form-items-right-details-package-price fs-22 fw-medium">€ {item.package.price}</p>
                                                :
                                                <p className="shopping-cart-form-items-right-details-package-price fs-22 fw-medium">€ {item.oferta.new_price}
                                                    <sup className="fs-18 fw-light" ><del>€ {item.package.price}</del></sup>
                                                </p>
                                            }

                                        </div>
                                    </div>
                                ))}
                                <div className="shopping-cart-form-items-right-details-discount flex ai-center jc-spaceb">
                                    <p className="shopping-cart-form-items-right-details-discount-title fs-16 fw-medium">Discount</p>
                                    <p className="shopping-cart-form-items-right-details-discount-ulja fs-16 fw-medium">€ {cmimiPaOfert - finalTotal}</p>
                                </div>

                                <div className="shopping-cart-form-items-right-details-total flex ai-center jc-spaceb">
                                    <p className="shopping-cart-form-items-right-details-total-title fs-24 fw-bold">Total </p>
                                    <p className="shopping-cart-form-items-right-details-total-vlera  fs-22 fw-semib">€ {finalTotal}</p>
                                </div>
                                <div ref={paypal} className="shopping-cart-form-items-right-details-btn" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="shopping-cart-empty flex fd-column ai-start" >
                    <p className="fs-28 fw-light">Cart is empty!</p>
                    <Link to="/shop" >Go to shop</Link>
                </div>
            }
        </div>
    )
}