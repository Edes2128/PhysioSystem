import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import FizioContext from '../../../context/fizioterapist/FizioContext'

export default function Paketat() {

    const [activeAction, setActiveAction] = useState(-1)
    const [activeDelete, setActiveDelete] = useState(-1)
    const [packageExist, setPakcageExist] = useState(true)
    const fizioContext = useContext(FizioContext);
    const { packages, getPackages , activateOffer } = fizioContext;

    useEffect(() => {    
        getPackages()
        activateOffer()
    }, [])

    useEffect(() => {
        if (packageExist) {
            setTimeout(() => setActiveDelete(-1), 4000)
        }
    }, [packageExist])

    const checkPaackgesIsBought = (id) => {
        axios.post('https://physiosystem.alcodeit.com/fizio/checkPacakeIsBought', { id }).then(res => {
            if (res.data.status === 1) {
                setPakcageExist(true)
            } else {
                setPakcageExist(false)
            }
        })
    }



    return (
        <div className="fizio-paketat">
            <div className="fizio-paketat-top flex ai-center jc-spaceb">
                <p className="fs-30 fw-bold" >Paketat <sup className="fs-20" >({packages.length})</sup> </p>
                <Link to="/fizio/shtopaket" className="fs-18 fw-regular fizio-paketat-top-button">Shto Paket</Link>
            </div>
            <div className="fizio-paketat-body ">
                {packages.map((paket, index) => (
                    <div key={paket.id} className="fizio-paketat-body-item flex fd-column ai-center">
                        <div className="fizio-paketat-body-item-image flex">
                            <img className="img-res" src={`https://physiosystem.alcodeit.com/files/${paket.photo}`} loading="lazy" alt="Foto Package" />
                        </div>
                        <div className="fizio-paketat-body-item-texts flex fd-column ai-start">
                            <p className="fizio-paketat-body-item-texts-title fs-30 fw-semib">{paket.titulli}</p>
                            <p className="fizio-paketat-body-item-texts-price fs-24 fw-regular">{paket.price} $</p>
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
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/fizio/package/${paket.id}`} className="fs-20 fw-light" >Edit</Link>
                                    <p className="fs-20 fw-light" onClick={() => {
                                        checkPaackgesIsBought(paket.id)
                                        setActiveAction(-1)
                                        setActiveDelete(index)
                                    }} >Delete</p>
                                </div>
                            }
                        </div>
                        {activeDelete === index &&
                            <div className="fizio-paketat-body-item-messages">
                                {packageExist === true ? <p className="fs-18 fw-bold" >Paketa eshte akoma e blere nga dikush</p> :
                                    <div className="fizio-paketat-body-item-messages-delete flex fd-column ai-center">
                                        <p className="fs-18 fw-bold" >Jeni te sigurt qe doni te fshni paketen?</p>
                                        <div className="fizio-paketat-body-item-messages-delete-buttons flex ai-center jc-spaceb">
                                            <button className="fs-18 fw-regular" onClick={() => {
                                                axios.post('https://physiosystem.alcodeit.com/fizio/deletePackage', { id: paket.id }).then(res => {
                                                    getPackages()
                                                    setActiveDelete(-1)
                                                })
                                            }} >Po</button>
                                            <button className="fs-18 fw-regular" onClick={() => {
                                                setActiveDelete(-1)

                                            }} >Jo</button>
                                        </div>
                                    </div>}
                            </div>
                        }

                    </div>
                ))}
            </div>
        </div>
    )
}
