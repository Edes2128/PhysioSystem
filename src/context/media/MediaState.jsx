import React, { useState } from 'react'
import MediaContext from './MediaContext'

export default function MediaState({ children }) {
    const [showMedia, setShowMedia] = useState(false)
    const [files, setFiles] = useState([]);
    const [localFiles, setLocalFiles] = useState([])
    const [videos, setVideos] = useState([{title: ''}])
    const [arrCompare, setArrCompare] = useState([])
    const [arrName, setArrName] = useState('')
    const [type, setType] = useState(0)

    return (
        <>
            <MediaContext.Provider
                value={{
                    files,
                    setFiles,
                    showMedia,
                    setShowMedia,
                    localFiles,
                    setLocalFiles,
                    videos,
                    setVideos,
                    arrCompare,
                    setArrCompare,
                    setArrName,
                    arrName,
                    setType,
                    type
                }} >
                {children}
            </MediaContext.Provider>
        </>
    )
}