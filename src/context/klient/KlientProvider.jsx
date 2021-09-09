import React, { useState, useEffect } from 'react'
import ClientContext from './klientContext'
import axios from 'axios'

export default function KlientProvider({ children }) {

    const [currentUser, setCurrentUser] = useState('');
    const [trialPackages, setTrialPackages] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.post('http://localhost/physiosystem/server/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setCurrentUser(res.data[0])
        })
    }, [])


    const getWishtlist = () => {
        axios.post('http://localhost/physiosystem/server/client/getWishlist', { user_id: currentUser.id }).then(res => {
            setWishlist(res.data)
        })
    }

    useEffect(() => {
        axios.get('http://localhost/physiosystem/server/client/getTrialPackages').then(res => {
            setTrialPackages(res.data)
        })
    }, [])

    useEffect(() => {

        axios.post('http://localhost/physiosystem/server/client/getWishlist', { user_id: localStorage.getItem('op') }).then(res => {
            setWishlist(res.data)
        })

    }, [])


    useEffect(() => {

        axios.post('http://localhost/physiosystem/server/client/getCart', { user_id: localStorage.getItem('op') }).then(res => {
            setCart(res.data)
        })

    }, [])


    const getCart = () => {
        axios.post('http://localhost/physiosystem/server/client/getCart', { user_id: localStorage.getItem('op') }).then(res => {
            setCart(res.data)
        })
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
                    getCart
                }} >
                {children}
            </ClientContext.Provider>
        </>
    )
}