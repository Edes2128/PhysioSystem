import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MediaContext from '../../../context/media/MediaContext'
import AlertContext from '../../../context/alerts/AlertContext'
import Loading from '../../../components/Loading'
import { Link } from 'react-router-dom'
import LoadingContext from '../../../context/loading/LoadingContext'
export default function EditPackage({ match }) {

    const loadingContext = useContext(LoadingContext)
    const { show, setShow } = loadingContext

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
    const [newDays, setNewDays] = useState([])
    const mediaContext = useContext(MediaContext)
    const {
        setShowMedia,
        setArrCompare,
        arrCompare,
        arrName,
        setArrName,
        setType,
        type
    } = mediaContext;



    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/fizio/getSinglePackage', { package_id: match.params.package_id }).then(res => {
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
            if (type === 1) {
                setDemoVideos(arrCompare)
            } else if (type === 2) {
                const item = days[arrName].videos = arrCompare
                setDays(prev => [...prev], item)
            } else {
                const item = newDays[arrName].day_videos = arrCompare
                setDays(prev => [...prev], item)
            }
        }
    }, [arrName, arrCompare])

    const updatePackage = () => {
        setShow(true)
        const fd = new FormData();
        fd.append('id', match.params.package_id);
        fd.append("titulli", titulli);
        fd.append("pershkrimi", pershkrimi);
        fd.append("price", cmimi);
        fd.append("photo", baner);
        fd.append("baner", cover)
        axios.post('https://physiosystem.alcodeit.com/fizio/updatePackage', fd).then(res => {
            if (res.data.status === 1) {
                setAlert(`${res.data.message}`, 'success')
                setShow(false)
            } else {
                setAlert(`${res.data.message}`, 'error')
                setShow(false)
            }
        })
    }

    const updateVideoDemo = () => {
        setShow(true)
        axios.post('https://physiosystem.alcodeit.com/fizio/updateDemoVideo', { package_id: match.params.package_id, demoVideos }).then(res => {
            if (res.status === 200) {
                setAlert('Demo updated', "success");
                setShow(false)
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


    const removeDay = (indexItem) => {
        const newData = [...newDays]
        const itemToRemove = newDays[indexItem];
        setNewDays(newData.filter(item => item !== itemToRemove))
    }

    return (
        <>
            {show && <Loading />}
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
                                <img src={`https://physiosystem.alcodeit.com/files/${baner}`} className="img-res" alt="" />
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
                            setType(1)
                        }} >Shto video</button>
                        :
                        <>
                            <button className="edit-package-videodemo-btn-add fs-18 fw-regular" onClick={() => {
                                setShowMedia(true)
                                setArrCompare(demoVideos)
                                setArrName(true)
                                setType(1)
                            }} >Shto video te tjera</button>
                            <div className="edit-package-videodemo-items ">
                                {demoVideos.map((demo, index) => (
                                    <div className="edit-package-videodemo-items-item flex fd-column ai-center">
                                        <div className="flex" >
                                            <video className="img-res" src={`https://physiosystem.alcodeit.com/files/${demo.src}`} controls ></video>
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
                                                            href={`https://physiosystem.alcodeit.com/files/${day.day_pdf}`}
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
                                            setType(2)

                                        }}
                                    >Shto video te tjera</button>
                                    <div className="edit-package-ditet-items-item-bottom-videos  ">
                                        {day.videos.map((video, index2) => (
                                            <div className="edit-package-ditet-items-item-bottom-videos-content flex ai-center fd-column">
                                                <div className="flex" >
                                                    <video controls className="img-res" src={`https://physiosystem.alcodeit.com/files/${video.src}`}></video>
                                                </div>
                                                <button className="fs-18 fw-regular" onClick={() => {
                                                    removeVideoDay(index, index2, video)
                                                }} >Fshi</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="edit-package-ditet-items-item-btn-save fs-18 fw-regular" onClick={() => {
                                    setShow(true)
                                    const fd = new FormData();
                                    fd.append("day_id", day.day_id)
                                    fd.append("id", match.params.package_id)
                                    fd.append("titulli", day.day_titulli)
                                    fd.append("pershkrimi", day.day_pershkrimi)
                                    fd.append("pdf", day.day_pdf)
                                    const videos = JSON.stringify(day.videos)
                                    fd.append("videos[]", videos)

                                    axios.post("https://physiosystem.alcodeit.com/fizio/updateDays", fd).then(res => {
                                        if (res.status === 200) {
                                            setShow(false)
                                            setAlert('Day updated', `success`)
                                        }
                                    })
                                }} >Ruaj</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="edit-package-add-days flex fd-column ai-start">
                    <p className="edit-package-add-days-title fs-18 fw-regular" >Ditet e reja</p>
                    {newDays.length === 0 &&
                        <button
                            className="edit-package-add-days-btn fs-18 fw-regular"
                            onClick={() => {
                                setNewDays(prev => [...prev,
                                {
                                    titulli: '',
                                    pershkrimi: '',
                                    pdf: '',
                                    day_videos: [],
                                }
                                ]
                                )
                            }}
                        >
                            Shto dit
                        </button>
                    }
                    {newDays.map((newDay, index) => (
                        <div className="edit-package-add-days-item flex fd-column">
                            <div className="edit-package-add-days-item-actions flex ai-center ">

                                <div
                                    className="edit-package-add-days-item-actions-add flex jc-center ai-center"
                                    onClick={() => {
                                        setNewDays(prev => [...prev, { titulli: '', pershkrimi: '', pdf: '', day_videos: [], }])
                                    }}
                                >
                                    <p className="fs-26 fw-regular" >+</p>
                                </div>
                                <div
                                    className="edit-package-add-days-item-actions-remove flex ai-center jc-center"
                                    onClick={() => {
                                        removeDay(index)
                                    }}
                                >
                                    <p className="fs-24 fw-regular" >-</p>
                                </div>



                            </div>
                            <div className="edit-package-add-days-item-top flex ai-center jc-spaceb">
                                <div className="edit-package-add-days-item-top-inputs flex fd-column ai-start">
                                    <label className="fs-16 fw-regular" htmlFor="#">Titulli</label>
                                    <input
                                        className="fs-16 fw-regular"
                                        value={newDay.titulli}
                                        type="text"
                                        onChange={(e) => {
                                            let newdata = [...newDays];
                                            const item = newdata[index];
                                            item.titulli = e.target.value;
                                            setDays(prev => [...prev], item)
                                        }}
                                    />
                                </div>
                                <div className="edit-package-add-days-item-top-inputs flex fd-column ai-start">
                                    <label className="fs-16 fw-regular" htmlFor="#">Pershkrimi</label>
                                    <input
                                        className="fs-16 fw-regular"
                                        value={newDay.pershkrimi}
                                        type="text"
                                        onChange={(e) => {
                                            let newdata = [...newDays];
                                            const item = newdata[index];
                                            item.pershkrimi = e.target.value;
                                            setDays(prev => [...prev], item)
                                        }}
                                    />
                                </div>
                                <div className="edit-package-add-days-item-top-inputs flex fd-column ai-center">
                                    {newDay.pdf === "" ?
                                        <>
                                            <label className="edit-package-add-days-item-top-inputs-pdfadd fs-16 fw-regular" htmlFor={`pdf-${index}`}>Upload PDF</label>
                                            <input type="file" hidden id={`pdf-${index}`} accept="application/pdf, .pdf"
                                                onChange={(e) => {
                                                    let newdata = [...newDays];
                                                    const item = newdata[index];
                                                    item.pdf = e.target.files[0];
                                                    setDays(prev => [...prev], item)
                                                }}

                                            />
                                        </>
                                        :
                                        <div className="edit-package-add-days-item-top-inputs-pdf flex fd-column ai-center" >
                                            <span
                                                className="edit-package-add-days-item-top-inputs-pdf-remove flex jc-center ai-center"
                                                onClick={(e) => {
                                                    let newdata = [...newDays];
                                                    const item = newdata[index];
                                                    item.pdf = "";
                                                    setDays(prev => [...prev], item)
                                                }}
                                            >
                                                X
                                            </span>
                                            <a href={URL.createObjectURL(newDay.pdf)} target="_blank" rel="noreferrer" className="flex" >
                                                <img src="/images/pdf.png" className="img-res" alt="" />
                                            </a>
                                            <p className="fs-18 fw-light" > {newDay.pdf.name} </p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="edit-package-add-days-item-bottom flex fd-column ai-start">
                                <p className="edit-package-add-days-item-bottom-title fs-18 fw-regular">Day Videos</p>

                                {newDay.day_videos.length === 0 ?
                                    <button className="edit-package-add-days-item-bottom-addvideos fs-18 fw-regular" onClick={() => {
                                        setShowMedia(true)
                                        setArrCompare(newDay.day_videos)
                                        setArrName(index)
                                        setType(3)
                                    }} >Upload Other Videos</button>
                                    :
                                    <>
                                        <button className="edit-package-add-days-item-bottom-addvideos fs-18 fw-regular" onClick={() => {
                                            setShowMedia(true)
                                            setArrCompare(newDay.day_videos)
                                            setArrName(index)
                                            setType(3)
                                        }} >Upload Videos</button>
                                        <div className="edit-package-add-days-item-bottom-items flex ai-start">
                                            {newDay.day_videos.map(video => (
                                                <div className="edit-package-add-days-item-bottom-items-video">
                                                    <video controls className="img-res" src={`https://physiosystem.alcodeit.com/files/${video.src}`}></video>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                    {newDays.length !== 0 &&
                        <button className="edit-package-add-days-ruaj fs-18 fw-regular" onClick={() => {
                            setShow(true)
                            let daysPdf = newDays.map(item => item.pdf)

                            const fd = new FormData();
                            fd.append("pacakge_id", match.params.package_id)
                            fd.append("new_days", JSON.stringify(newDays));
                            Array.from(daysPdf).forEach(pdf => {
                                fd.append(`days-pdf[]`, pdf)
                            })

                            axios.post('https://physiosystem.alcodeit.com/fizio/addNewDaysPackage', fd).then(res => {
                                if (res.status === 200) {
                                    setNewDays([])
                                    setAlert(`New days added`, 'success')
                                    setShow(false)
                                    axios.post('https://physiosystem.alcodeit.com/fizio/getSinglePackage', { package_id: match.params.package_id }).then(res => {
                                        setPackage(res.data)
                                        setTitulli(res.data.paket_name)
                                        setPerhkrimi(res.data.paket_pershkrimi)
                                        setCmimi(res.data.paket_price)
                                        setBaner(res.data.paket_photo)
                                        setDemoVideos(res.data.demo_videos)
                                        setDays(res.data.days)
                                    })
                                } else {
                                    setAlert(`${res.data}`, 'error')
                                    setShow(false)
                                }
                            })
                        }} >Ruaj Ditet e reja</button>
                    }
                </div>
            </div>
        </>
    )
}
