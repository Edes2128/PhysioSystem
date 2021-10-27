import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import HaderBanner from './components/HaderBanner'
import HeaderMobile from './components/HeaderMobile'
import MiniCart from './components/MiniCart'
import LoadingContext from '../../context/loading/LoadingContext'
import axios from 'axios'
export default function Klient({ history }) {
    const loadingContext = useContext(LoadingContext)
    const { minicart } = loadingContext
    const logout = () => {
        history.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('op')
        localStorage.removeItem('el')
    }
    const checkLogin = () => {
        axios.post('https://physiosystem.alcodeit.com/user/checkIsLoggedIN', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            if(res.data.status === 0){
                logout()
            }
        })
    }
    useEffect(() => {
        setInterval(() => checkLogin(), 60000)
    }, [])
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
