import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { ReactComponent as LikeUnfill } from '../../../images/like-unfill.svg'
import { ReactComponent as LikeFill } from '../../../images/like-fill.svg'
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
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>


                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>


                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>

                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>


                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>

                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeUnfill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>



                <div className="shop-packages-item flex fd-column ai-center">
                    <div className="shop-packages-item-top">
                        <div className="shop-packages-item-top-image flex">
                            <img src="/images/package-1.jpg" className="img-res" alt="" />
                        </div>
                        <div className="shop-packages-item-top-wish flex ai-center jc-center">
                            <LikeFill />
                        </div>
                    </div>
                    <div className="shop-packages-item-bottom flex fd-column ai-start">
                        <div className="shop-packages-item-bottom-details  flex ai-center jc-spaceb" >
                            <div className="shop-packages-item-bottom-details-left">
                                <p className="shop-packages-item-bottom-details-left-title fs-22 fw-bold">Lower Body</p>
                                <p className="fs-16 fw-light" >120 videos / 14 days</p>
                            </div>
                            <p className="shop-packages-item-bottom-details-price fs-22 fw-semib"> $ 120 </p>
                        </div>
                        <button className="shop-packages-item-bottom-add-btn fs-16 fw-medium" type="button">Add to Cart</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
