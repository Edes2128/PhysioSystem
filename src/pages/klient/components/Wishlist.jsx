import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'

export default function Wishlist() {
    return (
        <div className="wishlist" >
            <div className="wishlist-header flex ai-center jc-spaceb">
                <p className="wishlist-header-title fs-38 fw-semib">Wishlist</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    )
}
