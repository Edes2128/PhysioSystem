import React, { useState } from 'react'
import LoadingContext from './LoadingContext'
export default function LoadingState({ children }) {
    const [show, setShow] = useState(false);
    return (
        <LoadingContext.Provider value={{ show, setShow }} >
            {children}
        </LoadingContext.Provider>
    )
}
