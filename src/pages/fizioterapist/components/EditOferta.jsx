import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function EditOferta({ match }) {

    const [offer, setOffer] = useState('')
    const [titulli, setTitulli] = useState('');
    const [ulja, setUlja] = useState('');
    const [dataMbarimit, setDataMbarimit] = useState('')
    const [list, setList] = useState([])
    const [listDrejtuar, setListDretuar] = useState([])
    const [tipiUljes, setTipiUljes] = useState(1)
    const [baner, setBaner] = useState("")
    const [banerLocal, setBanerLocal] = useState("")

    useEffect(() => {

        axios.post('http://localhost/physiosystem/server/fizio/getSingleOffer', { id: match.params.offer_id }).then(res => {
            setOffer(res.data[0])
            setTitulli(res.data[0].titulli)
            setUlja(res.data[0].ulja)
            setTipiUljes(res.data[0].ulja_type)
            setDataMbarimit(res.data[0].end_date_2)
            setListDretuar(res.data[0].products)
        })

        axios.get('http://localhost/physiosystem/server/fizio/getPackages').then(res => {
            setList(res.data)
        })


    }, [match.params.offer_id])

    return (
        <div className="edit-offer flex fd-column ai-start" >
            <div className="edit-offer-links flex ai-center">
                <Link className="fs-38 fw-semib" to="/fizio/oferta" >Ofertat</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                    <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                </svg>
                <p className="fs-20 fw-regular" >{offer.titulli}</p>
            </div>
            <form className="add-offer-form flex fd-column ai-start" >

                <div className="add-offer-form-inputs flex jc-spaceb ai-center">
                    <div className="add-offer-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                        <input className="fs-18 fw-regular" type="text" value={titulli} onChange={(e) => {
                            setTitulli(e.target.value)
                        }} />
                    </div>
                    <div className="add-offer-form-inputs-item-select flex ai-center">
                        <div className="add-offer-form-inputs-item-select-input flex fd-column ai-start">
                            <label className="fs-18 fw-regular" htmlFor="#">Ulja</label>
                            <input className='fs-18 fw-regular' type="number" value={ulja} onChange={(e) => {
                                setUlja(e.target.value)
                            }} />
                        </div>
                        <div className="add-offer-form-inputs-item-select-input flex fd-column ai-start">
                            <label className="fs-18 fw-regular" htmlFor="#">Tipi Uljes</label>
                            <select className="fs-18 fw-regular" name="#" id="#" value={tipiUljes} onChange={(e) => setTipiUljes(e.target.value)} >
                                <option value={1}>%</option>
                                <option value={2}>Money</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-offer-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Data Mbarimit</label>
                        <input className="fs-18 fw-regular" type="date" value={dataMbarimit} onChange={(e) => {
                            setDataMbarimit(e.target.value)
                        }} />
                    </div>
                </div>


                <div className="edit-offer-packages flex fd-column ai-start">
                    <p className="edit-offer-packages-titulli fs-20 fw-regular">
                        Paketat
                    </p>
                    <div className="edit-offer-packages-items flex ai-start">
                        {offer && offer.products.map(paket => (
                            <>
                                <div className="edit-offer-packages-items-item flex fd-column ai-center">
                                    <div className="flex" >
                                        <img src={`http://localhost/physiosystem/server/files/${paket.photo}`} className="img-res" alt="" />
                                    </div>
                                    <div className="edit-offer-packages-items-item-texts flex ai-center jc-spaceb">
                                        <p className="edit-offer-packages-items-item-texts-titulli" > {paket.name}</p>
                                        <div className="edit-offer-packages-items-item-texts-prices flex ai-center">
                                            <p>{paket.new_price} $</p>
                                            <del>{paket.price} $</del>
                                        </div>
                                    </div>
                                    <button className="fs-18 fw-regular" type="button" onClick={() => {
                                        axios.post('http://localhost/physiosystem/server/fizio/deletePackOffer', { offer_id: match.params.offer_id, package_id: paket.id }).then(res => {
                                            if (res.data.status === 1) {
                                                axios.post('http://localhost/physiosystem/server/fizio/getSingleOffer', { id: match.params.offer_id }).then(res => {
                                                    setOffer(res.data[0])
                                                })
                                            }
                                        })
                                    }} >Remove</button>
                                </div>

                            </>
                        ))}
                    </div>
                </div>


                <div className="edit-offer-add-packages flex fd-column ai-start">
                    {offer.products && offer.products.length !== list.length && <p className="edit-offer-add-packages-title fs-20 fw-regular">Shto Paket</p>}
                    <div className="edit-offer-add-packages-items flex ai-start ">
                        {list.map(item => (
                            <>
                                {offer.products && offer.products.some(item2 => item2.id === item.id) === true ?
                                    <div></div>
                                    :
                                    <div className="edit-offer-add-packages-items-item flex fd-column ai-center">
                                        <div className="flex">
                                            <img src={`http://localhost/physiosystem/server/files/${item.photo}`} className="img-res" alt="" />
                                        </div>
                                        <div className="edit-offer-add-packages-items-item-texts flex ai-center jc-spaceb">
                                            <p>{item.titulli}</p>
                                            <p>{item.price} $</p>
                                        </div>
                                        <button type="button" className="fs-18 fw-regular" onClick={() => {
                                            axios.post('http://localhost/physiosystem/server/fizio/addPackOffer', { offer_id: match.params.offer_id, package_id: item.id }).then(res => {
                                                if (res.data.status === 1) {
                                                    axios.post('http://localhost/physiosystem/server/fizio/getSingleOffer', { id: match.params.offer_id }).then(res => {
                                                        setOffer(res.data[0])
                                                    })
                                                }
                                            })
                                        }} >Shto Paket</button>
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                </div>


                <div className="add-offer-form-inputs-image  flex jc-start">
                    {banerLocal === "" && baner === "" ?
                        <>
                            <label htmlFor="oferta-baner" className="add-offer-form-inputs-image-btn fs-18 fw-regular" >Upload Banner</label>
                            <input type="file" hidden id="oferta-baner" onChange={(e) => {
                                setBaner(e.target.files[0])
                                setBanerLocal(URL.createObjectURL(e.target.files[0]))
                            }} />
                        </>
                        :
                        <div className="add-offer-form-inputs-image-preview flex fd-column ai-center" >
                            <img src={banerLocal} className="img-res" alt="" />
                            <button onClick={() => {
                                setBanerLocal("")
                                setBaner("")
                            }} className="add-offer-form-inputs-image-preview-delete-btn fs-18 fw-regular" >Delete Banner</button>
                        </div>
                    }
                </div>
                <button className="add-offer-form-btn fs-18 fw-regular" type="submit" >Update</button>
            </form>
        </div>
    )
}
