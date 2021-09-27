import React, { useState } from 'react'
import FizioContext from './FizioContext'
import axios from 'axios'

export default function FizioState({ children }) {

    const [clients, setClients] = useState([])
    const [orders, setOrders] = useState([])
    const [packages, setPackages] = useState([])
    const [offers, setOffers] = useState([])

    const getClients = () => {
        axios.get('https://physiosystem.alcodeit.com//fizio/getAllClients').then(res => {
            setClients(res.data)
        })
    }
    const getOrders = () => {
        axios.get('https://physiosystem.alcodeit.com//fizio/getOrders').then(res => {
            setOrders(res.data)
        })
    }

    const getPackages = () => {
        axios.get('https://physiosystem.alcodeit.com//fizio/getPackages').then(res => {
            setPackages(res.data)
        })
    }

    const getOffers = () => {
        axios.get('https://physiosystem.alcodeit.com//fizio/getAllOffers').then(res => {
            setOffers(res.data)
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
                getPackages,
                offers,
                getOffers
            }} >
                {children}
            </FizioContext.Provider>
        </>
    )
}
