import React, { useState, useEffect , useContext } from 'react'
import axios from 'axios'
import MediaContext from '../../../context/media/MediaContext'
import {Link} from 'react-router-dom'

export default function EditPackage({ match }) {

    const [singlePackage, setPackage] = useState({})
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


        </div>
    )
}
