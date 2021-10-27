import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ClientContext from '../../../context/klient/klientContext'
import LoadingContext from '../../../context/loading/LoadingContext'

export default function SingleOffer({ match }) {

    const loadingContext = useContext(LoadingContext);
    const { setShow } = loadingContext
    const clientContext = useContext(ClientContext);
    const { getMyPackages, mypackages, cart, getCart } = clientContext
    const [packages, setPackages] = useState([])
    if (mypackages.length !== 0) {
        var packages2 = mypackages.map(item => item);
        var checker = (arr, target) => target.every(v => arr.includes(v));
        var myids = mypackages.map(item => item.id)
        var pacids = packages.map(item => item.id)
    }
    useEffect(() => {
        setShow(true)
        axios.post('https://physiosystem.alcodeit.com/client/getOfferPackages', { id: match.params.offerid }).then(res => {
            setPackages(res.data)
            setShow(false)
        })
        getMyPackages()
        getCart()
    }, [match.params.offerid])

    return (
        <div className="single-offer" >
            <>

                {mypackages.length !== 0 && checker(myids, pacids) === true ?
                    <p className="fs-30 fw-regular" >You have all packages of this offer!</p>
                    :
                    <>
                        {packages.map(paket => (
                            <>
                                {packages2.some(item => item.id === paket.id) === false

                                    &&
                                    <div className="single-offer-item flex fd-column ai-center">
                                        <div className="single-offer-item-top">
                                            <Link to={`/shop/${paket.id}`} className="single-offer-item-top-image flex">
                                                <img className="img-res" src={`https://physiosystem.alcodeit.com/files/${paket.photo}`} loading='lazy' alt="" />
                                            </Link>
                                        </div>
                                        <div className="single-offer-item-bottom flex fd-column ai-center">
                                            <div className="single-offer-item-bottom-texts flex ai-center jc-spaceb">
                                                <div className="single-offer-item-bottom-texts-left">
                                                    <p className="fs-22 fw-bold" > {paket.name}</p>
                                                    <p className="fs-16 fw-light" >{paket.days.length} days</p>
                                                </div>
                                                <p className="fs-22 fw-semib" >$ {paket.new_price} <sup className="fs-18 fw-light" ><del>$ {paket.price}</del></sup>  </p>
                                            </div>
                                            {cart.some(cart1 => cart1.package_id === paket.id) === true ?

                                                <Link className="fs-18 fw-regular" to="/shop/cart" >View Cart</Link>
                                                :
                                                <button className="fs-18 fw-regular"
                                                    onClick={() => {
                                                        setShow(true)
                                                        axios.post('https://physiosystem.alcodeit.com/client/addCart', { token: JSON.parse(localStorage.getItem('token')), package_id: paket.id }).then(res => {
                                                            getCart()
                                                            setShow(false)

                                                        })
                                                    }}
                                                >Add to Cart</button>
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                        ))}
                    </>
                }
            </>
        </div>
    )
}
