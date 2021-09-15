import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'

export default function Klientet() {
    return (
        <div className="klientet flex fd-column ai-start">
            
            <div className="klientet-top flex ai-center jc-spaceb">
                <p className="klientet-top-title fs-30 fw-medium" >Klientet <sup  className="fs-20">(20)</sup></p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="klientet-datatable">
                
            </div>


        </div>
    )
}
