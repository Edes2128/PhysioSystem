import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Line } from '../../../images/Line 5.svg'
import { ReactComponent as Cart } from '../../../images/cart-2.svg'
import { ReactComponent as MenuIcon } from '../../../images/icons8-menu-orange.svg'
import ClientContext from '../../../context/klient/klientContext'
import LoadingContext from '../../../context/loading/LoadingContext'
import axios from 'axios'
import MiniCart from './MiniCart'

export default function HeaderMobile() {
    const collapseContext = useContext(LoadingContext)
    const { setCollapse } = collapseContext
    const clientContext = useContext(ClientContext);
    const { currentUser, cart, getCart } = clientContext;
    const [offers, setOffers] = useState([])
    const [miniCart, showMiniCart] = useState(false)

    useEffect(() => {
        axios.get('https://physiosystem.alcodeit.com/client/testOfferPackages').then(res => {
            setOffers(res.data)
        })
        getCart()
    }, [])
    return (
        <div className="header-mobile" >
            <div className="headerbanner-top flex ai-center jc-start">
                <MenuIcon onClick={() => setCollapse(true)} className="headerbanner-top-ham-menu" />
                <div className="headerbanner-top-left flex ai-center">
                    <div className="headerbanner-top-left-widget flex ai-center jc-center"  >
                        {miniCart && <MiniCart />}
                        {cart.length > 0 &&
                            <div className="headerbanner-top-left-widget-nof flex ai-center jc-center"> <p className="fs-14 fw-light" > {cart.length} </p> </div>
                        }
                        <Cart onClick={() => {
                            showMiniCart(!miniCart)
                        }
                        } />
                    </div>
                </div>
                <Line />
                <div className="headerbanner-top-right flex ai-center">
                    <div className="headerbanner-top-right-logo flex">
                        <img src={currentUser && `https://physiosystem.alcodeit.com/files/${currentUser.image_profile}`} loading='lazy' className="img-res" alt="" />
                    </div>
                    <p className="fs-16 fw-medium" >{currentUser && currentUser.name}</p>
                </div>
            </div>
        </div>
    )
}
