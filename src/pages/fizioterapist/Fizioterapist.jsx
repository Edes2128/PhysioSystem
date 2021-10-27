import React, { useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FizioBody from './components/FizioBody'
import axios from 'axios'

export default function Fizioterapist({ history }) {

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
        <div className="fizioterapist" >
            <Header logout={logout} />
            <Sidebar logout={logout} />
            <FizioBody />
        </div>
    )
}
