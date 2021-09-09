import React, { useContext } from 'react'
import { ReactComponent as Line } from '../../../images/Line 5.svg'
import { ReactComponent as Bell } from '../../../images/bell-2.svg'
import { ReactComponent as Cart } from '../../../images/cart-2.svg'
import ClientContext from '../../../context/klient/klientContext'

export default function HaderBanner() {

    const clientContext = useContext(ClientContext);
    const { currentUser } = clientContext;

    return (
        <div className="headerbanner flex fd-column ai-center" >
            <div className="headerbanner-top flex ai-center jc-center">
                <div className="headerbanner-top-left flex ai-center">
                    <div className="headerbanner-top-left-widget flex ai-center jc-center">
                        <div className="headerbanner-top-left-widget-nof flex ai-center jc-center"> <p className="fs-14 fw-light" >2</p> </div>
                        <Cart />
                    </div>
                    <div className="headerbanner-top-left-widget flex ai-center jc-center">
                        <Bell />
                    </div>
                </div>
                <Line />
                <div className="headerbanner-top-right flex ai-center">
                    <div className="headerbanner-top-right-logo flex">
                        <img src="/images/profile-image.jpg" className="img-res" alt="" />
                    </div>
                    <p className="fs-16 fw-medium" >{currentUser.name}</p>
                </div>
            </div>
        </div>
    )
}
