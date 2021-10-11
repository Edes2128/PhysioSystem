import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function SinglePackage({ match }) {

    const [singlePackage, setSinglePakcage] = useState({})
    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/client/getSinglePackageTrial', { id: match.params.id }).then(res => {
            setSinglePakcage(res.data[0])
        })
    }, [match.params.id])

    return (
        <div className="singlepackage flex fd-column ai-start" >
            <div className="singlepackage-links flex ai-center" >
                <Link className="fs-38 fw-semib" to="/shop" style={{ color: 'black', textDecoration: 'none' }} >Packages</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                    <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                </svg>
                <p className="fs-20 fw-regular" >{singlePackage.package_name}</p>
            </div>

            <div className="singlepackage-details flex ai-start">
                <div className="singlepackage-details-left flex">
                    <img src={`https://physiosystem.alcodeit.com/files/${singlePackage.photo}`} className="img-res" alt="" />
                </div>
                <div className="singlepackage-details-right flex fd-column ai-start">
                    <p className="singlepackage-details-right-title fs-28 fw-semib">{singlePackage.package_name}</p>
                    <p className="singlepackage-details-right-text">
                        {singlePackage.pershkrimi}
                    </p>
                </div>
            </div>
            {singlePackage.videos_demo && <p className="singlepackage-demo-title fs-28 fw-semib">Video Demo</p>}

            <div className="singlepackage-demo t">
                {singlePackage.videos_demo && singlePackage.videos_demo.map(video => (
                    <div className="singlepackage-demo-item" onContextMenu={e => e.preventDefault()} >
                        <video className="img-res" src={`https://physiosystem.alcodeit.com/files/${video.video_src}`} controls></video>
                    </div>
                ))}
            </div>
            <div className="singlepackage-days flex fd-column ai-start">
                <p className="singlepackage-days-link fs-30 fw-semib">Days <sup className="fs-18 fw-regular" >({`${singlePackage.days && singlePackage.days.length}`})</sup> </p>
                <div className="singlepackage-days-items">
                    {singlePackage.days && singlePackage.days.map(day => (
                        <div className="singlepackage-days-items-content">
                            <div className="singlepackage-days-items-content-shape flex ai-center jc-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29.422" height="40.679" viewBox="0 0 29.422 40.679">
                                    <g id="lock-padlock-symbol-for-security-interface" transform="translate(-80.994)">
                                        <g id="Group_1111" data-name="Group 1111" transform="translate(80.994)">
                                            <path id="Path_504" data-name="Path 504" d="M95.705,0a11.91,11.91,0,0,0-11.9,11.9v6.794a.32.32,0,0,1-.17.232c-.643.215-1.166.4-1.644.585a1.646,1.646,0,0,0-1,1.47V36.59a1.657,1.657,0,0,0,.994,1.471,37.237,37.237,0,0,0,27.434,0,1.657,1.657,0,0,0,.994-1.471V20.978a1.646,1.646,0,0,0-1-1.471c-.478-.184-1-.37-1.644-.585a.32.32,0,0,1-.17-.232V11.9A11.91,11.91,0,0,0,95.705,0Zm-3.24,25.733a3.24,3.24,0,1,1,6.48,0,3.192,3.192,0,0,1-1.62,2.743v5.357a1.62,1.62,0,0,1-3.24,0V28.476A3.192,3.192,0,0,1,92.465,25.733ZM103.511,11.9v5.862a37.135,37.135,0,0,0-15.612,0V11.9a7.806,7.806,0,0,1,15.612,0Z" transform="translate(-80.994)" fill="#fff" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <img src={`https://physiosystem.alcodeit.com/files/${singlePackage.photo}`} className="img-res" alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
