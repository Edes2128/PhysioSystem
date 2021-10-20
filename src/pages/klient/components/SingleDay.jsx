import React, { useState, useEffect ,useRef , createRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ReactComponent as Pdf } from '../../../images/pdf-file.svg'
export default function SingleDay({ match }) {
    const [single, setSingle] = useState()
    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/client/getSingleBought', { user_id: localStorage.getItem('op'), package_id: match.params.id }).then(res => {
            setSingle(res.data)
        })
    }, [match.params.id])


    if (single) {
        var day = [];
        day = single.package.days.filter(item => item.id === parseInt(match.params.dayid))

    }

    return (
        <>
            {day && day.map(dita => (
                <div className="singleday flex fd-column ai-start" >
                    <div className="singleday-links flex ai-center">
                        <Link to="/shop/mypackages" className="fs-38 fw-semib" >My Packages</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                            <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                        </svg>
                        <Link to={`/shop/mypackages/${match.params.id}`} className="fs-20 fw-regular" > {single && single.package.name} </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                            <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                        </svg>
                        <p className="fs-20 fw-regular" > {dita.titulli} </p>
                    </div>

                    <div className="singleday-details flex ai-start">
                        <div className="singleday-details-left">
                            <img src={`https://physiosystem.alcodeit.com/files/${single && single.package.photo}`} className="img-res" alt="" />
                        </div>
                        <div className="singleday-details-right flex fd-column ai-end jc-spaceb">
                            <div className="flex fd-column ai-start" style={{ width: "100%" }} >
                                <p className="fs-28 fw-semib" >{dita.titulli}</p>
                                <p className="singleday-details-right-text fs-16 fw-regular" >{dita.pershkrimi}</p>
                            </div>
                            {dita.pdf &&
                                <a className="singleday-details-right-pdf" href={dita.pdf} download  >
                                    <Pdf />
                                </a>
                            }
                        </div>
                    </div>

                    <div className="singleday-videos flex fd-column ai-start">

                        <p className="singleday-videos-title fs-24 fw-semib">Videos <sup> ({dita.videos.length})</sup> </p>

                        <div className="singleday-videos-items flex ai-center fd-column">
                            {dita && dita.videos.map(video => (
                                <div className="singleday-videos-item" onContextMenu={e => e.preventDefault()} >
                                    <video  id='videos' preload='metadata' controls className="img-res" controlsList="nodownload" src={`https://physiosystem.alcodeit.com/files/${single && video.video_src}`}></video>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
