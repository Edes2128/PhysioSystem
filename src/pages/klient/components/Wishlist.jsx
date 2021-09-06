import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { ReactComponent as CartWhite } from '../../../images/cart-white-fill.svg'
import { ReactComponent as RemoveWish } from '../../../images/remove-wish.svg'

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
            <div className="wishlist-paketat flex ai-start">
                <div className="wishlist-paketat-item flex fd-column ai-center">
                    <div className="wishlist-paketat-item-top">
                        <div className="wishlist-paketat-item-top-image">
                            <img src="/images/package-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                        <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                            <div className="wishlist-paketat-item-bottom-details-texts">
                                <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="fs-22 fw-bold" >$ 120</p>
                        </div>
                        <button type="button" className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                            <RemoveWish />
                            Remove
                        </button>

                        <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                            <CartWhite />
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="wishlist-paketat-item flex fd-column ai-center">
                    <div className="wishlist-paketat-item-top">
                        <div className="wishlist-paketat-item-top-image">
                            <img src="/images/package-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                        <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                            <div className="wishlist-paketat-item-bottom-details-texts">
                                <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="fs-22 fw-bold" >$ 120</p>
                        </div>
                        <button type="button" className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                            <RemoveWish />
                            Remove
                        </button>

                        <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                            <CartWhite />
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="wishlist-paketat-item flex fd-column ai-center">
                    <div className="wishlist-paketat-item-top">
                        <div className="wishlist-paketat-item-top-image">
                            <img src="/images/package-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                        <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                            <div className="wishlist-paketat-item-bottom-details-texts">
                                <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="fs-22 fw-bold" >$ 120</p>
                        </div>
                        <button type="button" className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                            <RemoveWish />
                            Remove
                        </button>

                        <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                            <CartWhite />
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="wishlist-paketat-item flex fd-column ai-center">
                    <div className="wishlist-paketat-item-top">
                        <div className="wishlist-paketat-item-top-image">
                            <img src="/images/package-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                        <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                            <div className="wishlist-paketat-item-bottom-details-texts">
                                <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="fs-22 fw-bold" >$ 120</p>
                        </div>
                        <button type="button" className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                            <RemoveWish />
                            Remove
                        </button>

                        <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                            <CartWhite />
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="wishlist-paketat-item flex fd-column ai-center">
                    <div className="wishlist-paketat-item-top">
                        <div className="wishlist-paketat-item-top-image">
                            <img src="/images/package-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="wishlist-paketat-item-bottom flex fd-column ai-center">
                        <div className="wishlist-paketat-item-bottom-details flex ai-center jc-spaceb">
                            <div className="wishlist-paketat-item-bottom-details-texts">
                                <p className="wishlist-paketat-item-bottom-details-texts-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="fs-22 fw-bold" >$ 120</p>
                        </div>
                        <button type="button" className="wishlist-paketat-item-bottom-remove-btn flex ai-center jc-center fs-16 fw-medium"  >
                            <RemoveWish />
                            Remove
                        </button>

                        <button type="button" className="wishlist-paketat-item-bottom-add-btn flex ai-center jc-center fs-16 fw-medium" >
                            <CartWhite />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
