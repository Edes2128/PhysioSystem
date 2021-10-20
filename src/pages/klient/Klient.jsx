import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'
import HeaderMobile from './components/HeaderMobile'
import MiniCart from './components/MiniCart'
import LoadingContext from '../../context/loading/LoadingContext'
export default function Klient({ history }) {

    const loadingContext = useContext(LoadingContext)
    const { minicart } = loadingContext
    const logout = () => {
        history.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('op')
        localStorage.removeItem('el')
    }
    return (
        <div className="klient" >
            {minicart &&
                <MiniCart />
            }
            <Sidebar logout={logout} />
            <Body />
            <HaderBanner />
            <HeaderMobile />
        </div>
    )
}
