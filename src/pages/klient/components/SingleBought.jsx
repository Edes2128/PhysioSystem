import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingContext from '../../../context/loading/LoadingContext';

export default function SingleBought({ match }) {
    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const [single, setSingle] = useState()

    useEffect(() => {
        setShow(true)
        axios.post('https://physiosystem.alcodeit.com/client/getSingleBought', { user_id: localStorage.getItem('op'), package_id: match.params.id }).then(res => {
            setSingle(res.data)
            setTimeout(() => setShow(false), 1000)
        })
    }, [match.params.id])

    return (
        <div className="singlebought flex fd-column ai-start" >

            <div className="singlebought-links flex ai-center">
                <Link to="/shop/mypackages" className="fs-38 fw-semib" >My Packages</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                    <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                </svg>
                <p className="fs-20 fw-regular" >{single && single.package.name}</p>
            </div>


            <div className="singlepackage-details flex ai-start">
                <div className="singlepackage-details-left flex">
                    <img src={`https://physiosystem.alcodeit.com/files/${single && single.package.photo}`} loading='lazy' className="img-res" alt="" />
                </div>
                <div className="singlepackage-details-right flex fd-column ai-start ">
                    <p className="singlepackage-details-right-title fs-28 fw-semib">{single && single.package.name}</p>
                    <p className="singlepackage-details-right-text">
                        {single && single.package.pershkrimi}
                    </p>
                </div>
            </div>
            <div className="singlepackage-days flex fd-column ai-start">
                <p className="singlepackage-days-link fs-30 fw-semib">Days <sup className="fs-18 fw-regular" >({`${single && single.package.days.length}`})</sup> </p>
                <div className="singlepackage-days-items flex">
                    {single && single.package.days.map(day => (
                        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/shop/mypackages/${match.params.id}/days/${day.id}`} className="singlepackage-days-items-content flex ai-center fd-column">
                            <img src={`https://physiosystem.alcodeit.com/files/${single.package.photo}`} className="img-res" alt="" loading='lazy' />
                            <p style={{ marginTop: '10px' }} className="fs-20 fw-regular" >{day.titulli}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
