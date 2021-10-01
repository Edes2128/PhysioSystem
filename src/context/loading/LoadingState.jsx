import React, { useState } from 'react'
import LoadingContext from './LoadingContext'
export default function LoadingState({ children }) {
    const [show, setShow] = useState(false);
    const [collapse, setCollapse] = useState(false)
    return (
        <LoadingContext.Provider value={{ show, setShow, setCollapse, collapse }} >
            {children}
        </LoadingContext.Provider>
    )
}
