import React from 'react'
import { ReactComponent as Line } from '../../../images/Line 5.svg'
import { ReactComponent as Bell } from '../../../images/bell-2.svg'
import { ReactComponent as Cart } from '../../../images/cart-2.svg'


export default function HaderBanner() {
    return (
        <div className="headerbanner flex fd-column ai-center" >
            <div className="headerbanner-top flex ai-center jc-center">
                <div className="headerbanner-top-left flex ai-center">
                    <div className="headerbanner-top-left-widget flex ai-center jc-center">
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
                        <p className="fs-16 fw-medium" >Maria Bartley</p>
                </div>
            </div>
        </div>
    )
}
