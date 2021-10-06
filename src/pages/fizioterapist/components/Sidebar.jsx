import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as User } from '../../../images/gray-user.svg';
import { ReactComponent as Paketat } from '../../../images/gray-box.svg';
import { ReactComponent as Order } from '../../../images/gray-order.svg';
import { ReactComponent as Offer } from '../../../images/gray-offer.svg';
import LoadingContext from '../../../context/loading/LoadingContext';

export default function Sidebar({ logout }) {

    const collapseContext = useContext(LoadingContext)
    const { collapse, setCollapse } = collapseContext
    const [activeLink, setActiveLink] = useState('');
    const path = useLocation();

    useEffect(() => {
        setActiveLink(path.pathname)
    }, [path.pathname])

    return (
        <>
            <div onClick={() => setCollapse(false)} className={collapse ? "opa show-opa" : "opa"} ></div>
            <div className={collapse ? "fizio-sidebar show-fizio-sidebar flex fd-column ai-center jc-spaceb" : "fizio-sidebar flex fd-column ai-center jc-spaceb"}   >

                <div className="fizio-sidebar-logo">
                    <img className="img-res" src="/images/care-logo-white.png" alt="" />
                </div>

                <div className="fizio-sidebar-links flex fd-column ai-center">

                    <div onClick={() => setCollapse(false)} className={activeLink === '/fizio' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"} >
                        <Paketat />
                        <Link to="/fizio" className="fs-18 fw-medium" >Paketa</Link>

                    </div>


                    <div onClick={() => setCollapse(false)} className={activeLink === '/fizio/porosit' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>
                        <Order />
                        <Link to="/fizio/porosit" className="fs-18 fw-medium" >Porosit</Link>
                    </div>

                    <div onClick={() => setCollapse(false)} className={activeLink === '/fizio/oferta' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>

                        <Offer />
                        <Link to="/fizio/oferta" className="fs-18 fw-medium" >Oferta</Link>

                    </div>

                    <div onClick={() => setCollapse(false)} className={activeLink === '/fizio/klientet' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>

                        <User />
                        <Link to="/fizio/klientet" className="fs-18 fw-medium" >Klientet</Link>

                    </div>


                    <div onClick={() => setCollapse(false)} className={activeLink === '/fizio/profili' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>
                        <User />

                        <Link to="/fizio/profili" className="fs-18 fw-medium" >Profili</Link>

                    </div>
                </div>

                <div onClick={logout} className="fizio-sidebar-logout flex ai-center jc-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.98" height="18.038" viewBox="0 0 17.98 18.038">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(1.019 1.019)">
                            <path id="Path_35" data-name="Path 35" d="M6.346,17H2.808a1.774,1.774,0,0,1-1.77-1.778V2.778A1.774,1.774,0,0,1,2.808,1H6.346" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.038" />
                            <path id="Path_36" data-name="Path 36" d="M12.538,13.444,16.961,9,12.538,4.556" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.038" />
                            <path id="Path_37" data-name="Path 37" d="M16.961,9H6.346" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.077" />
                        </g>
                    </svg>

                    <p className="fs-20 fw-regular" >Logout</p>

                </div>

            </div>
        </>
    )
}
