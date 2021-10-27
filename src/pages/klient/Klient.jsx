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
        if (!localStorage.getItem('el') ||
            localStorage.getItem('el') === null ||
            localStorage.getItem('el') === "" ||
            localStorage.getItem('token') === "" ||
            localStorage.getItem('token') === null ||
            !localStorage.getItem('token') === null ||
            JSON.parse(localStorage.getItem('token')) === null ||
            JSON.parse(localStorage.getItem('token')) === "" ||
            !JSON.parse(localStorage.getItem('token')) ||
            localStorage.getItem('op') === null ||
            localStorage.getItem('op') === "" ||
            !localStorage.getItem('op')
        ) {
            logout();
        } else {
            axios.post('https://physiosystem.alcodeit.com/user/checkIsLoggedIN', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                if (res.data.status === 0) {
                    logout()
                }
            })
        }

    }
    useEffect(() => {
        let interval = setInterval(checkLogin, 60000)
        return () => clearInterval(interval)
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
