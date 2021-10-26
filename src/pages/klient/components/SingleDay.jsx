import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ReactComponent as Pdf } from '../../../images/pdf-file.svg'
import LoadingContext from '../../../context/loading/LoadingContext'
export default function SingleDay({ match }) {
    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const [single, setSingle] = useState({})

    useEffect(() => {
        setShow(true)
        axios.post('https://physiosystem.alcodeit.com/client/getSingleDay', { user_id: localStorage.getItem('op'), day_id: match.params.dayid, package_id: match.params.id }).then(res => {
            setSingle(res.data)
            setTimeout(() => setShow(false), 1000)
        })
    }, [match.params.id, match.params.dayid])


    useEffect(() => {
        if (single.day_status !== undefined && single.day_status === 0) {
            setTimeout(() => axios.post('https://physiosystem.alcodeit.com/client/updateDayStatus', { user_id: localStorage.getItem('op'), day_id: match.params.dayid, package_id: match.params.id }), 10000)
        }
    }, [single.day_status])

    return (
        <>
            {single &&
                <div className="singleday flex fd-column ai-start" >
                    <div className="singleday-links flex ai-center">
                        <Link to="/shop/mypackages" className="fs-38 fw-semib" >My Packages</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                            <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                        </svg>
                        <Link to={`/shop/mypackages/${match.params.id}`} className="fs-20 fw-regular" > {single.paket && single.paket.name} </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                            <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                        </svg>
                        <p className="fs-20 fw-regular" > {single && single.titulli} </p>
                    </div>
                    <div className="singleday-details flex ai-start">
                        <div className="singleday-details-left">
                            <img src={`https://physiosystem.alcodeit.com/files/${single.paket && single.paket.photo}`} className="img-res" alt="" />
                        </div>
                        <div className="singleday-details-right flex fd-column ai-end jc-spaceb">
                            <div className="flex fd-column ai-start" style={{ width: "100%" }} >
                                <p className="fs-28 fw-semib" >{single.titulli}</p>
                                <p className="singleday-details-right-text fs-16 fw-regular" >{single.pershkrimi}</p>
                            </div>
                            {single.pdf &&
                                <a className="singleday-details-right-pdf" href={single.pdf} download  >
                                    <Pdf />
                                </a>
                            }
                        </div>
                    </div>
                    {single.day_status === 1 &&
                        <div className='singleday-track flex fd-column ai-center' >
                            <p className='fs-26 fw-medium'>You have completed this day!</p>
                            <div className='flex' >
                                <img className='img-res' src="/images/fireworks.png" alt="" />
                            </div>
                        </div>
                    }
                    <div className="singleday-videos flex fd-column ai-start">
                        <p className="singleday-videos-title fs-24 fw-semib">Videos <sup> ({single.videos && single.videos.length})</sup> </p>
                        <div className="singleday-videos-items flex ai-start fd-column" style={{marginTop:'30px'}}>
                            {single.videos && single.videos.map(video => (
                                <>
                                <p className='fs-18 fw-regular' style={{marginBottom:'20px'}} > {video.reps} reps / {video.sets} sets </p>
                                <div key={video.src} className="singleday-videos-item" onContextMenu={e => e.preventDefault()} >
                                    <video id='videos' preload='metadata' controls className="img-res" controlsList="nodownload" src={`https://physiosystem.alcodeit.com/files/${single && video.src}`}></video>
                                </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
