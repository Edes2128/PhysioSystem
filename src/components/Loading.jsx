import React, { useContext } from 'react'
import LoadingContext from '../context/loading/LoadingContext'
export default function Loading() {
    const loadingContext = useContext(LoadingContext)
    const { show } = loadingContext
    return (
        <>
            {show &&
                <div className="loading flex ai-center jc-center" >
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </>
    )
}