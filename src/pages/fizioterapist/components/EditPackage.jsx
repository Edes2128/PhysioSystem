import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MediaContext from '../../../context/media/MediaContext'
import AlertContext from '../../../context/alerts/AlertContext'
import { Link } from 'react-router-dom'
export default function EditPackage({ match }) {
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext
    const [singlePackage, setPackage] = useState({})
    const [titulli, setTitulli] = useState('')
    const [pershkrimi, setPerhkrimi] = useState('')
    const [cmimi, setCmimi] = useState('')
    const [baner, setBaner] = useState('')
    const [cover, setCover] = useState('')
    const [localCover, setLocalCover] = useState('')
    const [demoVideos, setDemoVideos] = useState([])
    const [days, setDays] = useState([])
    const mediaContext = useContext(MediaContext)
    const {
        setShowMedia,
        setArrCompare,
        arrCompare,
        arrName,
        setArrName,
    } = mediaContext;

    useEffect(() => {
        axios.post('http://localhost/physiosystem/server/fizio/getSinglePackage', { package_id: match.params.package_id }).then(res => {
            setPackage(res.data)
            setTitulli(res.data.paket_name)
            setPerhkrimi(res.data.paket_pershkrimi)
            setCmimi(res.data.paket_price)
            setBaner(res.data.paket_photo)
            setDemoVideos(res.data.demo_videos)
            setDays(res.data.days)
        })
    }, [match.params.package_id])

    useEffect(() => {
        if (arrName !== '' && arrCompare.length !== 0) {
            if (arrName === true) {
                setDemoVideos(arrCompare)
            } else {
                const item = days[arrName].videos = arrCompare
                setDays(prev => [...prev], item)
            }
        }
    }, [arrName, arrCompare])

    const updatePackage = () => {
        const fd = new FormData();
        fd.append('id', match.params.package_id);
        fd.append("titulli", titulli);
        fd.append("pershkrimi", pershkrimi);
        fd.append("price", cmimi);
        fd.append("photo", baner);
        fd.append("baner", cover)
        axios.post('http://localhost/physiosystem/server/fizio/updatePackage', fd).then(res => {
            if (res.data.status === 1) {
                setAlert(`${res.data.message}`, 'success')
            } else {
                setAlert(`${res.data.message}`, 'error')
            }
        })
    }

    const updateVideoDemo = () => {

        axios.post('http://localhost/physiosystem/server/fizio/updateDemoVideo', { package_id: match.params.package_id, demoVideos }).then(res => {
            if (res.status === 200) {
                setAlert('Demo updated', "success");
            }
        })
    }

    const removeVideo = (index2, video) => {
        let newdata2 = [...demoVideos];
        setDemoVideos(newdata2.filter((item, index) => index !== index2))
    }


    const removeVideoDay = (index, index2, video) => {
        let newdata = [...days];
        let item = newdata[index]
        item.videos.splice(index2, 1)
        setDays(prev => [...prev], item)
    }


    console.log(days)

    return (
        <div className="edit-package flex fd-column ai-start">

            <div className="edit-package-links flex ai-center">
                <Link className="fs-38 fw-semib" to="/fizio" >Packages</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                    <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                </svg>
                <p className="fs-22 fw-regular" >{singlePackage.paket_name}</p>
            </div>

            <div className="edit-package-inputs flex ai-center jc-spaceb">
                <div className="edit-package-inputs-item flex fd-column ai-start">
                    <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                    <input className="fs-18 fw-regular" type="text" value={titulli} onChange={(e) => setTitulli(e.target.value)} />
                </div>
                <div className="edit-package-inputs-item flex fd-column ai-start">
                    <label className="fs-18 fw-regular" htmlFor="#">Pershkrimi</label>
                    <input className="fs-18 fw-regular" type="text" value={pershkrimi} onChange={(e) => setPerhkrimi(e.target.value)} />
                </div>
                <div className="edit-package-inputs-item flex fd-column ai-start">
                    <label className="fs-18 fw-regular" htmlFor="#">Cmimi</label>
                    <input className="fs-18 fw-regular" type="number" value={cmimi} onChange={(e) => setCmimi(e.target.value)} />
                </div>
            </div>

            <div className="edit-package-baner flex fd-column ai-start ">
                <p className="edit-package-baner-title fs-18 fw-regular ">Fotoja e Paketes</p>
                {baner !== "" ?
                    <div className="edit-package-baner-image flex fd-column ai-center" >
                        <div className="flex">
                            <img src={`http://localhost/physiosystem/server/files/${baner}`} className="img-res" alt="" />
                        </div>
                        <button className="fs-18 fw-regular" type="button" onClick={() => {
                            setBaner("")
                        }} >Fshi</button>
                    </div>
                    :
                    <>
                        {localCover !== "" && cover !== "" ?
                            <div className="edit-package-baner-upload-preview flex fd-column ai-center">
                                <img src={localCover} className="img-res" alt="" />
                                <button className="fs-18 fw-regular" type="button" onClick={() => {
                                    setLocalCover("")
                                    setCover("")
                                }} >Fshi</button>
                            </div>
                            :
                            <>
                                <div className="edit-package-baner-upload" >
                                    <label className="fs-18 fw-regular" htmlFor="cover">Upload Image</label>
                                    <input type="file" id="cover" hidden accept="image/*" onChange={(e) => {
                                        setLocalCover(URL.createObjectURL(e.target.files[0]))
                                        setCover(e.target.files[0])
                                    }} />
                                </div>
                            </>
                        }
                    </>
                }
            </div>

            <button className="edit-package-edit-btn fs-18 fw-regular"
                onClick={updatePackage}
            >Edit</button>

            <div className="edit-package-videodemo flex fd-column ai-start">

                <p className="edit-package-videodemo-title fs-18 fw-regular">Videot Demo</p>

                {demoVideos.length === 0 ?
                    <button className="edit-package-videodemo-btn-add fs-18 fw-regular" onClick={() => {
                        setShowMedia(true)
                        setArrCompare(demoVideos)
                        setArrName(true)
                    }} >Shto video</button>
                    :
                    <>
                        <button className="edit-package-videodemo-btn-add fs-18 fw-regular" onClick={() => {
                            setShowMedia(true)
                            setArrCompare(demoVideos)
                            setArrName(true)
                        }} >Shto video te tjera</button>
                        <div className="edit-package-videodemo-items flex ai-start">
                            {demoVideos.map((demo, index) => (
                                <div className="edit-package-videodemo-items-item flex fd-column ai-center">
                                    <div className="flex" >
                                        <video className="img-res" src={`http://localhost/physiosystem/server/files/${demo.src}`} controls ></video>
                                    </div>
                                    <button className="fs-18 fw-regular" onClick={() => {
                                        removeVideo(index)
                                    }} >Fshi</button>
                                </div>
                            ))}
                        </div>
                    </>
                }


            </div>
            {demoVideos.length !== 0 &&
                <button
                    className="edit-package-edit-btn fs-18 fw-regular"
                    onClick={updateVideoDemo}
                >
                    Edit Video Demo
                </button>
            }


            <div className="edit-package-ditet flex fd-column ai-start">
                <p className="edit-package-ditet-title fs-18 fw-regular">Ditet e Paketes</p>

                <div className="edit-package-ditet-items">
                    {days.map((day, index) => (
                        <div className="edit-package-ditet-items-item flex fd-column ai-start">
                            <div className="edit-package-ditet-items-item-top flex ai-center jc-spaceb ">
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                                    <input className="fs-18 fw-regular" type="text" value={day.day_titulli} onChange={(e) => {
                                        let newdata = [...days];
                                        const item = newdata[index];
                                        item.day_titulli = e.target.value;
                                        setDays(prev => [...prev], item)
                                    }} />
                                </div>
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Pershkrimi</label>
                                    <input className="fs-18 fw-regular" type="text" value={day.day_pershkrimi}
                                        onChange={(e) => {
                                            let newdata = [...days];
                                            const item = newdata[index];
                                            item.day_pershkrimi = e.target.value;
                                            setDays(prev => [...prev], item)
                                        }}
                                    />
                                </div>
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-center">



                                    {day.day_pdf !== "" ?
                                        <div className="edit-package-ditet-items-item-top-input-pdf flex fd-column ai-center" >
                                            <span className="fs-18 fw-regular flex ai-center jc-center"
                                                onClick={() => {
                                                    let newdata = [...days];
                                                    const item = newdata[index];
                                                    item.day_pdf = "";
                                                    setDays(prev => [...prev], item)
                                                }}

                                            >X</span>
                                            {typeof day.day_pdf === 'object' ?
                                                <>
                                                    <a
                                                        rel="noreferrer"
                                                        href={URL.createObjectURL(day.day_pdf)}
                                                        target="_blank"
                                                        className=" flex">
                                                        <img src="/images/pdf.png" className="img-res" alt="" />
                                                    </a>
                                                    <p className="fs-16 fw-regular" >{day.day_pdf.name}</p>
                                                </>
                                                :
                                                <>
                                                    <a
                                                        rel="noreferrer"
                                                        href={`http://localhost/physiosystem/server/files/${day.day_pdf}`}
                                                        target="_blank"
                                                        className=" flex">
                                                        <img src="/images/pdf.png" className="img-res" alt="" />
                                                    </a>
                                                    <p className="fs-16 fw-regular" >{day.day_pdf}</p>
                                                </>
                                            }
                                        </div>
                                        :
                                        <>
                                            <div className="edit-package-ditet-items-item-top-input-upload-pdf">
                                                <label htmlFor={`${day.day_pdf}-${index}`}>Ngarko PDF</label>
                                                <input accept="application/pdf, .pdf" type="file" hidden id={`${day.day_pdf}-${index}`} onChange={(e) => {
                                                    let newdata = [...days];
                                                    const item = newdata[index];
                                                    item.day_pdf = e.target.files[0];
                                                    setDays(prev => [...prev], item)
                                                }} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="edit-package-ditet-items-item-bottom flex fd-column ai-start">
                                <p className="edit-package-ditet-items-item-bottom-title fs-18 fw-light">Videot e Dites</p>

                                <button className="edit-package-ditet-items-item-bottom-add-other fs-18 fw-regular"
                                    onClick={() => {
                                        setShowMedia(true)
                                        setArrCompare(day.videos)
                                        setArrName(index)

                                    }}
                                >Shto video te tjera</button>
                                <div className="edit-package-ditet-items-item-bottom-videos flex ai-start ">
                                    {day.videos.map((video, index2) => (
                                        <div className="edit-package-ditet-items-item-bottom-videos-content flex ai-center fd-column">
                                            <div className="flex" >
                                                <video controls className="img-res" src={`http://localhost/physiosystem/server/files/${video.src}`}></video>
                                            </div>
                                            <button className="fs-18 fw-regular" onClick={() => {
                                                removeVideoDay(index, index2, video)
                                            }} >Fshi</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="edit-package-ditet-items-item-btn-save fs-18 fw-regular" onClick={() => {
                                const fd = new FormData();
                                fd.append("day_id", day.day_id)
                                fd.append("id", match.params.package_id)
                                fd.append("titulli", day.day_titulli)
                                fd.append("pershkrimi", day.day_pershkrimi)
                                fd.append("pdf", day.day_pdf)
                                const videos = JSON.stringify(day.videos)
                                fd.append("videos[]", videos)

                                axios.post("http://localhost/physiosystem/server/fizio/updateDays", fd).then(res => {
                                    if (res.status === 200) {
                                        setAlert('Day updated', `success`)
                                    }
                                })
                            }} >Ruaj</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
