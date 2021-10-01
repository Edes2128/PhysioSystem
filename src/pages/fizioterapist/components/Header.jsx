import React from 'react'
import {ReactComponent as MenuIcon} from '../../../images/icons8-menu.svg'

export default function Header({ logout }) {
    return (
        <div className="fizio-header flex jc-end ai-center" >
            {/* <div className="fizio-header-collapse">
                <svg id="Vector_Smart_Object" data-name="Vector Smart Object" xmlns="http://www.w3.org/2000/svg" width="24.012" height="24.012" viewBox="0 0 24.012 24.012">
                    <path id="Path_41" data-name="Path 41" d="M9.61,1.034H2.75A1.716,1.716,0,0,0,1.034,2.75V9.61A1.716,1.716,0,0,0,2.75,11.325H9.61A1.716,1.716,0,0,0,11.325,9.61V2.75A1.716,1.716,0,0,0,9.61,1.034Z" transform="translate(-1.034 -1.034)" fill="#fc4f46" />
                    <path id="Path_42" data-name="Path 42" d="M19.068,1.034h-6.86A1.716,1.716,0,0,0,10.493,2.75V9.61a1.716,1.716,0,0,0,1.715,1.715h6.86A1.716,1.716,0,0,0,20.783,9.61V2.75A1.716,1.716,0,0,0,19.068,1.034Z" transform="translate(3.228 -1.034)" fill="#fc4f46" />
                    <path id="Path_43" data-name="Path 43" d="M19.068,10.493h-6.86a1.716,1.716,0,0,0-1.715,1.715v6.86a1.716,1.716,0,0,0,1.715,1.715h6.86a1.716,1.716,0,0,0,1.715-1.715v-6.86A1.716,1.716,0,0,0,19.068,10.493Z" transform="translate(3.228 3.228)" fill="#fc4f46" />
                    <path id="Path_44" data-name="Path 44" d="M9.61,10.493H2.75a1.716,1.716,0,0,0-1.715,1.715v6.86A1.716,1.716,0,0,0,2.75,20.783H9.61a1.716,1.716,0,0,0,1.715-1.715v-6.86A1.716,1.716,0,0,0,9.61,10.493Z" transform="translate(-1.034 3.228)" fill="#fc4f46" />
                </svg>
            </div> */}
            <div className="fizio-header-widgets flex ai-center">
                <div className="fizio-header-widgets-item flex jc-center ai-center" onClick={logout} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.98" height="18.038" viewBox="0 0 17.98 18.038">
                        <g id="Vector_Smart_Object" data-name="Vector Smart Object" transform="translate(1.019 1.019)">
                            <path id="Path_35" data-name="Path 35" d="M6.346,17H2.808a1.774,1.774,0,0,1-1.77-1.778V2.778A1.774,1.774,0,0,1,2.808,1H6.346" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.038" />
                            <path id="Path_36" data-name="Path 36" d="M12.538,13.444,16.961,9,12.538,4.556" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.038" />
                            <path id="Path_37" data-name="Path 37" d="M16.961,9H6.346" transform="translate(-1.038 -1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.077" />
                        </g>
                    </svg>
                </div>
            </div>
            <MenuIcon />
        </div>
    )
}
