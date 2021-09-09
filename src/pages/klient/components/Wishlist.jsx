import React, { useContext } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { ReactComponent as CartWhite } from '../../../images/cart-white-fill.svg'
import { ReactComponent as RemoveWish } from '../../../images/remove-wish.svg'
import ClientContext from '../../../context/klient/klientContext'
import axios from 'axios'

export default function Wishlist() {

    const clientContext = useContext(ClientContext);
    const { wishlist, getWishtlist } = clientContext
    return (
        <div className="wishlist" >
            <div className="wishlist-header flex ai-center jc-spaceb">
                <p className="wishlist-header-title fs-38 fw-semib">Wishlist</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="wishlist-paketat flex ai-start">

                {wishlist && wishlist.map((wish, index) => (
                    <div className="wishlist-paketat-item flex fd-column ai-center">
                        <div className="wishlist-paketat-item-top">
                            <div className="wishlist-paketat-item-top-image">
                                <img src={`http://localhost/physiosystem/server/files/${wish.package[0].photo}`} className="img-res" alt="" />
                            </div>
                        </div>
                        <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                            <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                                <div className="wishlist-paketat-item-bottom-details-texts">
                                    <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">{wish.package[0].name}</p>
                                    <p className="fs-16 fw-light" >120 videos / 14 days</p>
                                </div>
                                <p className="fs-22 fw-bold" >$ {wish.package[0].price}</p>
                            </div>
                            <button type="button" onClick={() => {
                                axios.post('http://localhost/physiosystem/server/client/removeWishlist', { user_id: localStorage.getItem('op'), id: wish.package_id }).then(res => {
                                    getWishtlist()
                                })
                            }} className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                                <RemoveWish />
                                Remove
                            </button>

                            <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                                <CartWhite />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
