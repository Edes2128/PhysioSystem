import React, { useState } from 'react'
import LoadingContext from './LoadingContext'
export default function LoadingState({ children }) {
    const [show, setShow] = useState(false);
    const [collapse, setCollapse] = useState(false)
    const [minicart, showMinicart] = useState(false)
    return (
        <LoadingContext.Provider value={{ show, setShow, setCollapse, collapse, minicart, showMinicart }} >
            {children}
        </LoadingContext.Provider>
    )
}
