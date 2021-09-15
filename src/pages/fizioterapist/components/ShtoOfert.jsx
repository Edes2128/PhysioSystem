import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import AlertContext from '../../../context/alerts/AlertContext';

export default function ShtoOfert() {

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [titulli, setTitulli] = useState('');
    const [ulja, setUlja] = useState('');
    const [dataMbarimit, setDataMbarimit] = useState('')
    const [list, setList] = useState([])
    const [listDrejtuar, setListDretuar] = useState([])
    const [tipiUljes, setTipiUljes] = useState(1)
    const [activeList, setActiveList] = useState(false)
    const [baner, setBaner] = useState("")
    const [banerLocal, setBanerLocal] = useState("")

    const addOffer = (e) => {
        if (titulli === "" || ulja === "" || dataMbarimit === "" || tipiUljes === "") {
            setAlert(`Plotesoni fushat`, 'error')
            e.preventDefault();
        } else {
            e.preventDefault();
            const formData = new FormData();
            formData.append('titulli', titulli);
            formData.append('ulja', ulja);
            formData.append('tipi_uljes', tipiUljes);
            formData.append('data_mbarimit', dataMbarimit);
            formData.append('drejtuar[]', JSON.stringify(listDrejtuar));
            formData.append('image', baner);

            axios.post('http://localhost/physiosystem/server/fizio/addOffer', formData).then(res => {
                if (res.status === 200) {
                    setAlert(`Oferta u shtua`, 'success')
                    setTitulli('')
                    setUlja('')
                    setTipiUljes(1)
                    setDataMbarimit('')
                    setListDretuar([])
                    setBaner('')
                    setBanerLocal('')
                }
            })
        }

    }

    useEffect(() => {
        axios.get('http://localhost/physiosystem/server/fizio/getPackages').then(res => {

            const newdata = res.data.map(item => {
                const obj = {
                    id: item.id,
                    titulli: item.titulli
                };
                return obj;

            })

            setList(newdata)
        })
    }, [])

    const selectPack = (item) => {
        setListDretuar(prev => [...prev, item])
        let newList = [...list]
        setList(newList.filter(item2 => item2 !== item))
    }

    const unsselectPack = (item) => {
        setList(prev => [...prev, item])
        let newList = [...listDrejtuar]
        setListDretuar(newList.filter(item2 => item2 !== item))
    }


    return (
        <div className="add-offer" >
            <p className="add-offer-title fs-30 fw-semib ">Add Offer</p>
            <form className="add-offer-form flex fd-column ai-start" onSubmit={addOffer}>

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

                <div className="add-offer-form-inputs flex jc-spaceb ai-center">
                    <div className="add-offer-form-inputs-multi">
                        <label className="fs-18 fw-regular" htmlFor="#">Drejtuar</label>
                        <div className="add-offer-form-inputs-multi-input flex ai-center jc-spaceb" >
                            <div className="add-offer-form-inputs-multi-input-items flex ai-center">
                                {listDrejtuar.map(item => (
                                    <div className="add-offer-form-inputs-multi-input-items-item flex ai-center">
                                        <p className="fs-16 fw-medium" >{item.titulli}</p>
                                        <svg
                                            onClick={() => unsselectPack(item)}
                                            version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <metadata>
                                                Created by potrace 1.16, written by Peter Selinger 2001-2019
                                            </metadata>
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill="#fff" stroke="none">
                                                <path d="M957 4163 l-117 -118 742 -742 743 -743 -743 -743 -742 -742 117
                                                -118 118 -117 742 742 743 743 745 -745 745 -745 117 118 118 117 -745 745
                                                -745 745 743 743 742 742 -117 118 -118 117 -742 -742 -743 -743 -743 743
                                                -742 742 -118 -117z"/>
                                            </g>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <svg
                                onClick={() => {
                                    setActiveList(!activeList)
                                }}
                                version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="25" height="25" viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ cursor: 'pointer' }}
                            >
                                <metadata>
                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                </metadata>
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#fff" stroke="none">
                                    <path d="M695 3531 c-46 -19 -70 -73 -53 -121 6 -18 315 -324 831 -822 1159
                                    -1120 1039 -1008 1087 -1008 34 0 48 7 87 43 165 148 1811 1746 1826 1771 46
                                    79 -37 170 -121 134 -17 -7 -425 -393 -906 -858 -481 -464 -878 -846 -883
                                    -847 -4 -1 -399 376 -878 839 -478 462 -883 849 -900 859 -32 20 -58 23 -90
                                    10z"/>
                                </g>
                            </svg>
                            {activeList &&
                                <div className="add-offer-form-inputs-multi-input-list flex fd-column ai-start">
                                    {list.length !== 0 && list.map(item => (
                                        <div onClick={() => selectPack(item)} className="add-offer-form-inputs-multi-input-list-item">
                                            <p className="fs-20 fw-medium" >{item.titulli}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
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

                <button className="add-offer-form-btn fs-18 fw-regular" type="submit" >Krijo Oferte</button>
            </form>
        </div>
    )
}
