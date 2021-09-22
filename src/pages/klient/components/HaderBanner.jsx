import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Line } from '../../../images/Line 5.svg'
import { ReactComponent as Bell } from '../../../images/bell-2.svg'
import { ReactComponent as Cart } from '../../../images/cart-2.svg'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function HaderBanner() {

    const clientContext = useContext(ClientContext);
    const { currentUser, cart, mypackages, getMyPackages } = clientContext;
    const [offers, setOffers] = useState([])

    useEffect(() => {
        axios.post('http://localhost/physiosystem/server/client/getOfferPackages').then(res => {
            setOffers(res.data)
        })
        getMyPackages()
    }, [])
console.log(mypackages)
    return (
        <div className="headerbanner flex fd-column ai-center" >
            <div className="headerbanner-top flex ai-center jc-center">
                <div className="headerbanner-top-left flex ai-center">
                    <div className="headerbanner-top-left-widget flex ai-center jc-center">
                        {cart.length > 0 &&
                            <div className="headerbanner-top-left-widget-nof flex ai-center jc-center"> <p className="fs-14 fw-light" > {cart.length} </p> </div>
                        }
                        <Cart />
                    </div>
                    <div className="headerbanner-top-left-widget flex ai-center jc-center">
                        <Bell />
                    </div>
                </div>
                <Line />
                <div className="headerbanner-top-right flex ai-center">
                    <div className="headerbanner-top-right-logo flex">
                        <img src={currentUser && `http://localhost/physiosystem/server/files/${currentUser.image_profile}`} className="img-res" alt="" />
                    </div>
                    <p className="fs-16 fw-medium" >{currentUser && currentUser.name}</p>
                </div>
            </div>

            <div className="headerbanner-offers flex fd-column ai-start">
                <p className="headerbanner-offers-title fs-32 fw-bold">Offers</p>
                <p className="headerbanner-offers-subtitle fs-16 fw-regular">Get a look at our best offers</p>
                { offers.length !== 0 && offers.map(oferta => (
                    <>
                        {mypackages.some(item => item.packages[0].id === oferta.id_package) === false
                            ?
                            <>
                                {oferta.oferta !== false && oferta.oferta.offer_status === 1 &&
                                    <Link  to={`/shop/${oferta.id_package}`} className="headerbanner-offers-item flex">
                                        <div className="headerbanner-offers-item-shape"></div>
                                        <div className="headerbanner-offers-item-details">
                                            <p className="fs-16 fw-regular" >{oferta.package_name}</p>
                                            <span className="fs-32 fw-semib" >{oferta.oferta.new_price} $</span>
                                        </div>
                                        <img src={`http://localhost/physiosystem/server/files/${oferta.oferta.oferta_baner}`} className="img-res" alt="" />
                                    </Link>
                                }
                            </>

                            :
                            ""
                        }
                    </>
                ))}
            </div>
        </div>
    )
}
