import React from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'
import HeaderMobile from './components/HeaderMobile'
import MiniCart from './components/MiniCart'
export default function Klient({ history }) {
    const logout = () => {
        history.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('op')
        localStorage.removeItem('el')
    }
    return (
        <div className="klient" >
            <MiniCart />
            <Sidebar logout={logout} />
            <Body />
            <HaderBanner />
            <HeaderMobile />
        </div>
    )
}
