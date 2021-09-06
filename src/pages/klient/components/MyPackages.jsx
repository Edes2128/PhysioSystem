import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'

export default function MyPackages() {
    return (
        <div className="mypackages" >
            <div className="mypackages-header flex ai-center jc-spaceb">
                <p className="mypackages-header-title fs-38 fw-semib">My Packages</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="mypackages-paketat flex ai-start">

                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>


                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>


                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>


                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>


                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>

                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>

                <div className="mypackages-paketat-item  flex fd-column ai-center">
                    <div className="mypackages-paketat-item-image">
                        <img src="/images/package-1.jpg" className="img-res" alt="" />
                    </div>
                    <p className="mypackages-paketat-item-title fs-22 fw-bold">Lower Body</p>
                </div>

            </div>
        </div>
    )
}
