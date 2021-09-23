import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ClientContext from '../../../context/klient/klientContext'

export default function SingleOffer({ match }) {

    const clientContext = useContext(ClientContext);
    const { getMyPackages, mypackages, cart, getCart } = clientContext
    const [packages, setPackages] = useState([])
    if (mypackages) {
        var packages2 = mypackages.map(item => item.packages[0]);
    }

    useEffect(() => {
        axios.post('http://localhost/physiosystem/server/client/getOfferPackages', { id: match.params.offerid }).then(res => {
            setPackages(res.data)
        })
        getMyPackages()
        getCart()
    }, [match.params.offerid])

    return (
        <div className="single-offer flex  ai-start" >
            {packages.map(paket => (
                <>
                    {packages2.some(item => item.id === paket.id) === true ?
                        <div></div>
                        :
                        <div className="single-offer-item flex fd-column ai-center">
                            <div className="single-offer-item-top">
                                <Link to={`/shop/${paket.id}`} className="single-offer-item-top-image flex">
                                    <img className="img-res" src={`http://localhost/physiosystem/server/files/${paket.photo}`} alt="" />
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
                                            axios.post('http://localhost/physiosystem/server/client/addCart', { user_id: localStorage.getItem('op'), package_id: paket.id }).then(res => {
                                                getCart()
                                            })
                                        }}
                                    >Add to Cart</button>
                                }
                            </div>
                        </div>
                    }
                </>
            ))}
        </div>
    )
}
