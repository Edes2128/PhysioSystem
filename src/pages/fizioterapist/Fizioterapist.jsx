import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FizioBody from './components/FizioBody'

export default function Fizioterapist({ history }) {

    const logout = () => {
        history.push('/')
        localStorage.removeItem('token')
        localStorage.removeItem('op')
    }

    return (
        <div className="fizioterapist" >
            <Header logout={logout} />
            <Sidebar logout={logout} />
            <FizioBody />
        </div>
    )
}
