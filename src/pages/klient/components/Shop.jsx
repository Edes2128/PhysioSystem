import React, { useContext, useEffect } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { ReactComponent as LikeUnfill } from '../../../images/like-unfill.svg'
import { ReactComponent as LikeFill } from '../../../images/like-fill.svg'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Shop() {

    const clientContext = useContext(ClientContext)
    const { trialPackages, wishlist, getWishtlist, cart, getCart, setTrialPackages, getMyPackages, mypackages } = clientContext

    useEffect(() => {
        getWishtlist()
        getMyPackages()
        axios.get('http://localhost/physiosystem/server/client/getTrialPackages').then(res => {
            setTrialPackages(res.data)
        })
    }, [])

    if (mypackages) {
        var packages = mypackages.map(item => item.packages[0]);
    }

    return (
        <div className="shop" >
            <div className="shop-header flex ai-center jc-spaceb">
                <p className="shop-header-title fs-38 fw-semib">Packages</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="shop-packages flex ai-start">
                {trialPackages.map(paket => (
                    <>
                        {packages.some(item => item.id === paket.id) === true ?
                            <div></div>
                            :
                            <div className="shop-packages-item flex fd-column ai-center">
                                <div className="shop-packages-item-top">
                                    <Link to={`/shop/${paket.id}`} className="shop-packages-item-top-image flex" onClick={() => {

                                    }} >
                                        <img src={`http://localhost/physiosystem/server/files/${paket.photo}`} className="img-res" alt="" />
                                    </Link>
                                    {wishlist.some((wish) => wish.package_id === paket.id) === true ?
                                        <>
                                            <div className="shop-packages-item-top-wish flex ai-center jc-center" onClick={() => {
                                                axios.post('http://localhost/physiosystem/server/client/removeWishlist', { user_id: localStorage.getItem('op'), id: paket.id }).then(res => {
                                                    getWishtlist()
                                                })
                                            }} >
                                                <LikeFill />
                                            </div>
                                        </>
                                        :
                                        <div className="shop-packages-item-top-wish flex ai-center jc-center" onClick={() => {
                                            axios.post('http://localhost/physiosystem/server/client/addWishlist', { package_id: paket.id, user_id: localStorage.getItem('op') }).then(res => {
                                                getWishtlist()
                                            })

                                        }} >
                                            <LikeUnfill />
                                        </div>
                                    }
                                </div>
                                <div className="shop-packages-item-bottom flex fd-column ai-start">
                                    <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                                        <div className="shop-packages-item-bottom-details-left">
                                            <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">{paket.package_name}</p>
                                            <p className="fs-16 fw-light" >{paket.days.length} days</p>
                                        </div>
                                        <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ {paket.price} </p>
                                    </div>

                                    {cart.some(cart1 => cart1.package_id === paket.id) === true ?
                                        <Link to="/shop/cart" className="shop-packages-item-bottom-view-btn" >View Cart</Link>
                                        :
                                        <button
                                            className="shop-packages-item-bottom-add-btn fs-16 fw-medium"
                                            type="button"
                                            onClick={() => {
                                                axios.post('http://localhost/physiosystem/server/client/addCart', { user_id: localStorage.getItem('op'), package_id: paket.id }).then(res => {
                                                    getCart()
                                                })
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}
