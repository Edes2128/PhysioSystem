import React from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'


export default function Klient({ history }) {

    const logout = () => {
        history.push('/')
    }


    return (
        <div className="klient" >
            <Sidebar logout={logout} />
            <Body />
            <HaderBanner />
        </div>
    )
}
