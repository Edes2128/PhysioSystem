import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MediaContext from '../../../context/media/MediaContext'
import { Link } from 'react-router-dom'

export default function EditPackage({ match }) {

    const [singlePackage, setPackage] = useState({})
    const [titulli, setTitulli] = useState('')
    const [pershkrimi, setPerhkrimi] = useState('')
    const [cmimi, setCmimi] = useState('')
    const [baner, setBaner] = useState('')
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

    console.log(singlePackage)

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
                        <button className="fs-18 fw-regular" type="button">Fshi</button>
                    </div>
                    :
                    <div></div>
                }
            </div>

            <button className="edit-package-edit-btn fs-18 fw-regular">Edit</button>

            <div className="edit-package-videodemo flex fd-column ai-start">

                <p className="edit-package-videodemo-title fs-18 fw-regular">Videot Demo</p>

                <div className="edit-package-videodemo-items flex ai-start">
                    {demoVideos.map(demo => (
                        <div className="edit-package-videodemo-items-item flex fd-column ai-center">
                            <div className="flex" >
                                <video className="img-res" src={`http://localhost/physiosystem/server/files/${demo.video_src}`} controls ></video>
                            </div>
                            <button className="fs-18 fw-regular" >Fshi</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="edit-package-ditet flex fd-column ai-start">
                <p className="edit-package-ditet-title fs-18 fw-regular">Ditet e Paketes</p>

                <div className="edit-package-ditet-items">
                    {days.map(day => (
                        <div className="edit-package-ditet-items-item flex fd-column ai-start">
                            <div className="edit-package-ditet-items-item-top flex ai-center jc-spaceb ">
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                                    <input className="fs-18 fw-regular" type="text" value={day.day_titulli} />
                                </div>
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Pershkrimi</label>
                                    <input className="fs-18 fw-regular" type="text" value={day.day_pershkrimi} />
                                </div>
                                <div className="edit-package-ditet-items-item-top-input flex fd-column ai-start">
                                    
                                </div>
                            </div>
                            <div className="edit-package-ditet-items-item-bottom flex fd-column ai-start">
                                <p className="edit-package-ditet-items-item-bottom-title fs-18 fw-light">Videot e Dites</p>
                                <div className="edit-package-ditet-items-item-bottom-videos flex ai-start ">
                                    {day.videos.map(video => (
                                        <div className="edit-package-ditet-items-item-bottom-videos-content flex ai-center fd-column">
                                            <div className="flex" >
                                                <video controls className="img-res" src={`http://localhost/physiosystem/server/files/${video.video_src}`}></video>
                                            </div>
                                            <button className="fs-18 fw-regular" >Fshi</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="edit-package-ditet-items-item-btn-save fs-18 fw-regular" >Ruaj</button>
                        </div>
                    ))}
                </div>
            </div>


     

        </div>
    )
}
