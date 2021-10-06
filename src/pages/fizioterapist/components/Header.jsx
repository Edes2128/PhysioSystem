import React, { useContext } from 'react'
import { ReactComponent as MenuIcon } from '../../../images/icons8-menu.svg'
import LoadingContext from '../../../context/loading/LoadingContext'

export default function Header({ logout }) {

    const collapseContext = useContext(LoadingContext)
    const { setCollapse } = collapseContext
    return (
        <div className="fizio-header flex jc-end ai-center" >
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
            <MenuIcon className="fizio-header-menu" onClick={() => setCollapse(true)} />
        </div>
    )
}
