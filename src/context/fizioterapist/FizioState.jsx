import React, { useState } from 'react'
import FizioContext from './FizioContext'
import axios from 'axios'

export default function FizioState({ children }) {

    const [clients, setClients] = useState([])
    const [orders, setOrders] = useState([])
    const [packages, setPackages] = useState([])

    const getClients = () => {
        axios.get('http://localhost/physiosystem/server/fizio/getAllClients').then(res => {
            setClients(res.data)
        })
    }
    const getOrders = () => {
        axios.get('http://localhost/physiosystem/server/fizio/getOrders').then(res => {
            setOrders(res.data)
        })
    }

    const getPackages = () => {
        axios.get('http://localhost/physiosystem/server/fizio/getPackages').then(res => {
            setPackages(res.data)
        })
    }

    return (
        <>
            <FizioContext.Provider value={{
                clients,
                getClients,
                orders,
                getOrders,
                packages,
                getPackages
            }} >
                {children}
            </FizioContext.Provider>
        </>
    )
}
