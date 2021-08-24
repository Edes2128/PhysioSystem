import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FizioBody from './components/FizioBody'

export default function Fizioterapist() {
    return (
        <div className="fizioterapist" >
            <Header />
            <Sidebar />
            <FizioBody />
        </div>
    )
}
