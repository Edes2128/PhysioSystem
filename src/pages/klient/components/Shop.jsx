import React from 'react'
import {ReactComponent as Search} from '../../../images/loupe.svg'

export default function Shop() {
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
                        <div className="shop-packages-item flex fd-column ai-center">

                        </div>
                </div>
        </div>
    )
}
