import React from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'

export default function Klient() {
    return (
        <div className="klient" >
            <Sidebar />
            <Body />
            <HaderBanner />
        </div>
    )
}
