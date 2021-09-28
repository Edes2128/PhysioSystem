import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function SingleDay({ match }) {
    const [single, setSingle] = useState()
    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/client/getSingleBought', { user_id: localStorage.getItem('op'), package_id: match.params.id }).then(res => {
            setSingle(res.data)
        })
    }, [match.params.id])
    if (single) {
        var day = single.package.days.filter(item => item.id === parseInt(match.params.dayid))
    }
    return (
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
                <p className="fs-20 fw-regular" > {single && day[0].titulli} </p>
            </div>

            <div className="singleday-details flex ai-start">
                <div className="singleday-details-left">
                    <img src={`https://physiosystem.alcodeit.com/files/${single && single.package.photo}`} className="img-res" alt="" />
                </div>
                <div className="singleday-details-right">
                    <p className="fs-28 fw-semib" >{single && day[0].titulli}</p>
                    <p className="singleday-details-right-text fs-16 fw-regular" >{single && day[0].pershkrimi}</p>
                </div>
            </div>

            <div className="singleday-videos flex fd-column ai-start">

                <p className="singleday-videos-title fs-24 fw-semib">Videos <sup> ({single && day[0].videos.length})</sup> </p>

                <div className="singleday-videos-items flex ai-center fd-column">
                    {single && day[0].videos.map(video => (
                        <div className="singleday-videos-item">
                            <video controls className="img-res" src={`https://physiosystem.alcodeit.com/files/${single && video.video_src}`}></video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
