import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { ReactComponent as LikeUnfill } from '../../../images/like-unfill.svg'
import { ReactComponent as LikeFill } from '../../../images/like-fill.svg'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingContext from '../../../context/loading/LoadingContext'

export default function Shop() {

    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const clientContext = useContext(ClientContext)
    const { trialPackages, wishlist, getWishtlist, cart, getCart, setTrialPackages, getMyPackages, mypackages, expireMyPackage, activateOffer } = clientContext
    const [search, setSearch] = useState('')

    useEffect(() => {
        activateOffer()
        getWishtlist()
        getMyPackages()
        expireMyPackage()
        axios.post('https://physiosystem.alcodeit.com/client/getTrialPackages', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setTrialPackages(res.data)
        })
    }, [])


    const packageFiltered = trialPackages.filter((paket) => paket.package_name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="shop" >
            <div className="shop-header flex ai-center jc-spaceb">
                <p className="shop-header-title fs-38 fw-semib">Packages</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="shop-packages ">
                {trialPackages.length === mypackages.length &&
                    <p className="fs-24 fw-medium" >Wow you have bought all packages!</p>
                }
                {packageFiltered.map(paket => (
                    <>
                        {mypackages.some(item => item.id === paket.id) === false &&

                            <div key={paket.id} className="shop-packages-item flex fd-column ai-center">
                                <div className="shop-packages-item-top">
                                    <Link to={`/shop/${paket.id}`} className="shop-packages-item-top-image flex" onClick={() => {

                                    }} >
                                        <img src={`https://physiosystem.alcodeit.com/files/${paket.photo}`} loading='lazy' className="img-res" alt="" />
                                    </Link>
                                    {wishlist.some((wish) => wish.package_id === paket.id) === true ?
                                        <>
                                            <div className="shop-packages-item-top-wish flex ai-center jc-center" onClick={() => {
                                                setShow(true)
                                                axios.post('https://physiosystem.alcodeit.com/client/removeWishlist', { token: JSON.parse(localStorage.getItem('token')), id: paket.id }).then(res => {
                                                    getWishtlist()
                                                    setTimeout(() => setShow(false), 1000)
                                                })
                                            }} >
                                                <LikeFill />
                                            </div>
                                        </>
                                        :
                                        <div className="shop-packages-item-top-wish flex ai-center jc-center" onClick={() => {
                                            setShow(true)
                                            axios.post('https://physiosystem.alcodeit.com/client/addWishlist', { package_id: paket.id, token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                                                setTimeout(() => setShow(false), 1000)
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
                                        {paket.oferta === false || paket.oferta.offer_status === 0 ?
                                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> € {paket.price} </p>
                                            :
                                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib" > € {paket.oferta.new_price}
                                                <sup className="fs-14 fw-regular" >
                                                    <del>$ {paket.price}</del></sup>
                                            </p>
                                        }
                                    </div>

                                    {cart.some(cart1 => cart1.package_id === paket.id) === true ?
                                        <Link to="/shop/cart" className="shop-packages-item-bottom-view-btn" >View Cart</Link>
                                        :
                                        <button
                                            className="shop-packages-item-bottom-add-btn fs-16 fw-medium"
                                            type="button"
                                            onClick={() => {
                                                setShow(true)
                                                axios.post('https://physiosystem.alcodeit.com/client/addCart', { token: JSON.parse(localStorage.getItem('token')), package_id: paket.id }).then(res => {
                                                    if (res.status === 200) {
                                                        setTimeout(() => setShow(false), 1000)
                                                        getCart()
                                                    }
                                                })
                                            }}
                                        >
                                            Buy Now
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
