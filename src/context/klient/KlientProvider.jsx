import React, { useState, useEffect } from 'react'
import ClientContext from './klientContext'
import axios from 'axios'

export default function KlientProvider({ children }) {

    const [currentUser, setCurrentUser] = useState('')


    useEffect(() => {

        axios.post('http://localhost/physiosystem/server/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setCurrentUser(res.data[0])
        })

    }, [])
    return (
        <>
            <ClientContext.Provider value={{ currentUser, setCurrentUser }} >
                {children}
            </ClientContext.Provider>
        </>
    )
}
