import React, { useState } from 'react'
import {Link} from 'react-router-dom'
export default function Paketat() {

    const [activeAction, setActiveAction] = useState(-1)

    let packages = [
        {
            id: 1,
            title: "Back Pain",
            price: "50 $",
            image: "/images/1.jpg"
        },
        {
            id: 2,
            title: "Low Pain",
            price: "10 $",
            image: "/images/2.jpg"
        },
        {
            id: 3,
            title: "Shtylla Pain",
            price: "20 $",
            image: "/images/3.jpg"
        },
        {
            id: 1,
            title: "Back Pain",
            price: "50 $",
            image: "/images/2.jpg"
        },
        {
            id: 2,
            title: "Low Pain",
            price: "10 $",
            image: "/images/3.jpg"
        },
        {
            id: 3,
            title: "Shtylla Pain",
            price: "20 $",
            image: "/images/1.jpg"
        },
    ]
    return (
        <div className="fizio-paketat">
            <div className="fizio-paketat-top flex ai-center jc-spaceb">
                <p className="fs-30 fw-bold" >Paketat <sup className="fs-20" >(20)</sup> </p>
                <Link to="/fizio/shtopaket" className="fs-18 fw-regular fizio-paketat-top-button">Shto Paket</Link>
            </div>
            <div className="fizio-paketat-body flex jc-spaceb">

                {packages.map((paket, index) => (
                    <div key={paket.id} className="fizio-paketat-body-item flex fd-column ai-center">
                        <div className="fizio-paketat-body-item-image flex">
                            <img className="img-res" src={paket.image} alt="Foto Package" />
                        </div>
                        <div className="fizio-paketat-body-item-texts flex fd-column ai-start">
                            <p className="fizio-paketat-body-item-texts-title fs-30 fw-semib">{paket.title}</p>
                            <p className="fizio-paketat-body-item-texts-price fs-24 fw-regular">{paket.price}</p>
                        </div>
                        <div className="fizio-paketat-body-item-actions flex ai-center jc-center" >
                            <div className="fizio-paketat-body-item-actions-dots" onClick={() => {
                                if (activeAction === index) {
                                    setActiveAction(-1)
                                } else {
                                    setActiveAction(index)
                                }
                            }} >
                                <div className="fizio-paketat-body-item-actions-dots-circle"></div>
                                <div className="fizio-paketat-body-item-actions-dots-circle"></div>
                                <div className="fizio-paketat-body-item-actions-dots-circle"></div>
                            </div>
                            {activeAction === index &&
                                <div className="fizio-paketat-body-item-actions-widgets">
                                    <p className="fs-20 fw-light" >Edit</p>
                                    <p className="fs-20 fw-light" >Delete</p>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
