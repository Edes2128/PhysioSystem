import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

    const [activeLink, setActiveLink] = useState('');
    const path = useLocation();

    useEffect(() => {
        setActiveLink(path.pathname)
    }, [path.pathname])

    return (
        <div className="fizio-sidebar flex fd-column ai-center jc-spaceb" >

            <div className="fizio-sidebar-logo">
                <img className="img-res" src="/images/logo-white.png" alt="" />
            </div>

            <div className="fizio-sidebar-links flex fd-column ai-center">

                <div className={activeLink === '/fizio' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"} >

                    <svg xmlns="http://www.w3.org/2000/svg" width="16.015" height="20.985" viewBox="0 0 13.015 17.985">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(0.716 0.716)">
                            <path id="Path_45" data-name="Path 45" d="M10.279,4.582A3.511,3.511,0,0,1,6.8,8.128,3.511,3.511,0,0,1,3.329,4.582,3.511,3.511,0,0,1,6.8,1.034,3.511,3.511,0,0,1,10.279,4.582Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                            <path id="Path_46" data-name="Path 46" d="M12.595,17.586H1.013V15.223a3.512,3.512,0,0,1,3.475-3.548H9.12a3.512,3.512,0,0,1,3.475,3.548Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                        </g>
                    </svg>

                    <Link to="/fizio" className="fs-20 fw-regular" >Paketa</Link>

                </div>


                <div className={activeLink === '/fizio/porosit' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16.015" height="20.985" viewBox="0 0 13.015 17.985">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(0.716 0.716)">
                            <path id="Path_45" data-name="Path 45" d="M10.279,4.582A3.511,3.511,0,0,1,6.8,8.128,3.511,3.511,0,0,1,3.329,4.582,3.511,3.511,0,0,1,6.8,1.034,3.511,3.511,0,0,1,10.279,4.582Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                            <path id="Path_46" data-name="Path 46" d="M12.595,17.586H1.013V15.223a3.512,3.512,0,0,1,3.475-3.548H9.12a3.512,3.512,0,0,1,3.475,3.548Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                        </g>
                    </svg>

                    <Link to="/fizio/porosit" className="fs-20 fw-regular" >Porosit</Link>

                </div>

                <div className={activeLink === '/fizio/oferta' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.015" height="20.985" viewBox="0 0 13.015 17.985">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(0.716 0.716)">
                            <path id="Path_45" data-name="Path 45" d="M10.279,4.582A3.511,3.511,0,0,1,6.8,8.128,3.511,3.511,0,0,1,3.329,4.582,3.511,3.511,0,0,1,6.8,1.034,3.511,3.511,0,0,1,10.279,4.582Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                            <path id="Path_46" data-name="Path 46" d="M12.595,17.586H1.013V15.223a3.512,3.512,0,0,1,3.475-3.548H9.12a3.512,3.512,0,0,1,3.475,3.548Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                        </g>
                    </svg>

                    <Link to="/fizio/oferta" className="fs-20 fw-regular" >Oferta</Link>

                </div>

                <div className={activeLink === '/fizio/klientet' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16.015" height="20.985" viewBox="0 0 13.015 17.985">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(0.716 0.716)">
                            <path id="Path_45" data-name="Path 45" d="M10.279,4.582A3.511,3.511,0,0,1,6.8,8.128,3.511,3.511,0,0,1,3.329,4.582,3.511,3.511,0,0,1,6.8,1.034,3.511,3.511,0,0,1,10.279,4.582Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                            <path id="Path_46" data-name="Path 46" d="M12.595,17.586H1.013V15.223a3.512,3.512,0,0,1,3.475-3.548H9.12a3.512,3.512,0,0,1,3.475,3.548Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                        </g>
                    </svg>

                    <Link to="/fizio/klientet" className="fs-20 fw-regular" >Klientet</Link>

                </div>


                <div className={activeLink === '/fizio/profili' ? "fizio-sidebar-links-item fizio-sidebar-links-item-active flex ai-center jc-start" : "fizio-sidebar-links-item  flex ai-center jc-start"}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16.015" height="20.985" viewBox="0 0 13.015 17.985">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(0.716 0.716)">
                            <path id="Path_45" data-name="Path 45" d="M10.279,4.582A3.511,3.511,0,0,1,6.8,8.128,3.511,3.511,0,0,1,3.329,4.582,3.511,3.511,0,0,1,6.8,1.034,3.511,3.511,0,0,1,10.279,4.582Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                            <path id="Path_46" data-name="Path 46" d="M12.595,17.586H1.013V15.223a3.512,3.512,0,0,1,3.475-3.548H9.12a3.512,3.512,0,0,1,3.475,3.548Z" transform="translate(-1.013 -1.034)" fill="none" stroke="#fff" stroke-linecap="square" stroke-width="1.433" />
                        </g>
                    </svg>

                    <Link to="/fizio/profili" className="fs-20 fw-regular" >Profili</Link>

                </div>
            </div>

            <div className="fizio-sidebar-logout flex ai-center jc-center">
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
    )
}
