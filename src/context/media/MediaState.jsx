import React, { useState } from 'react'
import MediaContext from './MediaContext'

export default function MediaState({ children }) {
    const [showMedia, setShowMedia] = useState(false)
    const [files, setFiles] = useState([]);
    const [localFiles, setLocalFiles] = useState([])
    const [videos, setVideos] = useState([])
    const [arrCompare, setArrCompare] = useState([])
    const [arrName, setArrName] = useState('')

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
                }} >
                {children}
            </MediaContext.Provider>
        </>
    )
}