import React, { useContext, useEffect } from 'react'
import { ReactComponent as CartWhite } from '../../../images/cart-white-fill.svg'
import { ReactComponent as RemoveWish } from '../../../images/remove-wish.svg'
import ClientContext from '../../../context/klient/klientContext'
import LoadingContext from '../../../context/loading/LoadingContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Wishlist() {

    const clientContext = useContext(ClientContext);
    const { wishlist, getWishtlist, cart, getCart } = clientContext

    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    useEffect(() => {
        getWishtlist()
    }, [])

    return (
        <>
            <div className="wishlist" >
                <div className="wishlist-header flex ai-center jc-spaceb">
                    <p className="wishlist-header-title fs-38 fw-semib">Wishlist</p>
                </div>
                {wishlist.length === 0 &&
                    <div className="wishlist-paketat-empty flex fd-column ai-start">
                        <p className="fs-28 fw-light" >Wishlist is empty! Go to shop to explore some packages.</p>
                        <Link className="fs-18 fw-regular" to="/shop" >Go to shop</Link>
                    </div>
                }
                <div className="wishlist-paketat ">

                    {wishlist.length !== 0 && wishlist.map((wish, index) => (
                        <div className="wishlist-paketat-item flex fd-column ai-center">
                            <div className="wishlist-paketat-item-top">
                                <div className="wishlist-paketat-item-top-image">
                                    <img loading='lazy' src={wish.package[0].photo ? `https://physiosystem.alcodeit.com/files/${wish.package[0].photo}` : ""} className="img-res" alt="" />
                                </div>
                            </div>
                            <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                                <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                                    <div className="wishlist-paketat-item-bottom-details-texts">
                                        <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">{wish.package[0].name}</p>
                                        <p className="fs-16 fw-light" >120 videos / 14 days</p>
                                    </div>
                                    <p className="fs-22 fw-bold" >€ {wish.package[0].price}</p>
                                </div>
                                <button type="button" onClick={() => {
                                    setShow(true)
                                    axios.post('https://physiosystem.alcodeit.com/client/removeWishlist', { token: JSON.parse(localStorage.getItem('token')), id: wish.package_id }).then(res => {
                                        getWishtlist()
                                        setTimeout(() => setShow(false), 1000)
                                    })
                                }} className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                                    <RemoveWish />
                                    Remove
                                </button>
                                {cart.some(item => item.package_id === wish.package_id) === true ? <Link className="wishlist-paketat-item-bottom-view-btn flex ai-center jc-center fs-16 fw-medium" to="/shop/cart" >View Cart</Link>
                                    :
                                    <button
                                        type="button"
                                        className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium"
                                        onClick={() => {
                                            setShow(true)
                                            axios.post('https://physiosystem.alcodeit.com/client/addCart', { token: JSON.parse(localStorage.getItem('token')), package_id: wish.package_id }).then(res => {
                                                getCart()
                                                axios.post('https://physiosystem.alcodeit.com/client/removeWishlist', { token: JSON.parse(localStorage.getItem('token')), id: wish.package_id }).then(res => {
                                                    getWishtlist()
                                                    setTimeout(() => setShow(false), 1000)
                                                })
                                            })

                                        }}
                                    >
                                        <CartWhite />
                                        Add to Cart
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}