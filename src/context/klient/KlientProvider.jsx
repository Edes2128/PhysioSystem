import React, { useState, useEffect } from 'react'
import ClientContext from './klientContext'
import axios from 'axios'

export default function KlientProvider({ children }) {

    const [currentUser, setCurrentUser] = useState('');
    const [trialPackages, setTrialPackages] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [mypackages, setMypackages] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setCurrentUser(res.data[0])
        })
    }, [])


    const getOrders = () => {
        axios.post('https://physiosystem.alcodeit.com/client/getOrders', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setOrders(res.data)
        })
    }

    const getWishtlist = () => {
        axios.post('https://physiosystem.alcodeit.com/client/getWishlist', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setWishlist(res.data)
        })
    }
    const getCart = () => {
        axios.post('https://physiosystem.alcodeit.com/client/getCart', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setCart(res.data)
        })
    }

    const getMyPackages = () => {

        axios.post('https://physiosystem.alcodeit.com/client/getMyPackages', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setMypackages(res.data)
        })

    }
    const expireMyPackage = () => {
        axios.post('https://physiosystem.alcodeit.com/client/expireMyPackage', { user_id: localStorage.getItem('op') })
    }
    const activateOffer = () => {
        axios.post('https://physiosystem.alcodeit.com/client/activateSchelduedOffer')
    }

    return (
        <>
            <ClientContext.Provider
                value={{
                    currentUser,
                    setCurrentUser,
                    trialPackages,
                    setTrialPackages,
                    wishlist,
                    setWishlist,
                    getWishtlist,
                    cart,
                    getCart,
                    getMyPackages,
                    mypackages,
                    orders,
                    getOrders,
                    expireMyPackage,
                    activateOffer
                }} >
                {children}
            </ClientContext.Provider>
        </>
    )
}