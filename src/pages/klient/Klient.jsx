import React from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'


export default function Klient({ history }) {

    const logout = () => {
        history.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('op')
    }


    return (
        <div className="klient" >
            <Sidebar logout={logout} />
            <Body />
            <HaderBanner />
        </div>
    )
}
