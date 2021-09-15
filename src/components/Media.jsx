import React, { useState, useContext, useEffect } from 'react'
import MediaContext from '../context/media/MediaContext'
import axios from 'axios'
import { ReactComponent as Close } from '../images/CLOSE.svg'
import { ReactComponent as Check } from '../images/check.svg'
import { ReactComponent as Minus } from '../images/minus.svg'

export default function Media() {
    const [activeTab, setActiveTab] = useState('post')
    const mediaContext = useContext(MediaContext);
    const {
        files,
        setFiles,
        localFiles,
        setLocalFiles,
        videos,
        setVideos,
        arrCompare,
        setArrCompare,
        setShowMedia,
        showMedia,
        setArrName,
    } = mediaContext


    const uploadVideos = () => {
        const fd = new FormData();
        Array.from(files).forEach(file => {
            fd.append('files[]', file)
        })
        axios.post('http://localhost/physiosystem/server/fizio/uploadVideos', fd).then(res => {
            if (res.status === 200) {
                setFiles([])
                setLocalFiles([])
                axios.get('http://localhost/physiosystem/server/fizio/getVideos').then(res => {
                    setVideos(res.data)
                    setActiveTab('get')
                })
            }
        })
    }
    useEffect(() => {
        axios.get('http://localhost/physiosystem/server/fizio/getVideos').then(res => {
            setVideos(res.data)
        })
    }, [])

    return (
        <>
            {showMedia &&
                <div className="media-library flex jc-center ai-center" >
                    <div className="media-library-opa"></div>
                    <div className="media-library-content flex fd-column ai-start">
                        {localFiles.length !== 0 && files.length !== 0 &&

                            <div className="media-library-content-widget flex jc-end ai-center">
                                <button className="fs-18 fw-regular"
                                    onClick={uploadVideos}
                                >Upload Videos</button>
                                <button className="fs-18 fw-regular" onClick={() => {
                                    setLocalFiles([])
                                    setFiles([])
                                }}>Cancel</button>
                            </div>
                        }
                        <div className="media-library-content-tabs flex ai-center">
                            <Close onClick={() => {
                                setShowMedia(false)
                           setTimeout(() =>  setArrName([]),1000)    
                           setArrCompare([])   
                            }
                            } />
                            <p
                                onClick={() => setActiveTab('post')}
                                className={activeTab === "post" ? "media-library-content-tabs-active fs-20 fw-medium" : "fs-20 fw-medium"} >Upload Videos</p>
                            <p
                                onClick={() => setActiveTab('get')}
                                className={activeTab === "get" ? "media-library-content-tabs-active fs-20 fw-medium" : "fs-20 fw-medium"}>Videos</p>
                        </div>

                        {activeTab === 'post' &&

                            <div className="media-library-content-upload  flex jc-center ">
                                {localFiles.length === 0 && files.length === 0 ?
                                    <>
                                        <label htmlFor="media-upload" className="media-library-content-upload-btn fs-30 fw-regular" >Upload videos</label>
                                        <input type="file" hidden id="media-upload" multiple
                                            accept="video/*"
                                            onChange={(e) => {
                                                for (let i = 0; i < e.target.files.length; i++) {
                                                    setFiles(prev => [...prev, e.target.files[i]])
                                                    setLocalFiles(prev => [...prev, URL.createObjectURL(e.target.files[i])])
                                                }
                                            }}
                                        />
                                    </>
                                    :
                                    <div className="media-library-content-upload-preview flex" >
                                        {localFiles.map(item => (
                                            <div className="media-library-content-upload-preview-item  flex">
                                                <video className="img-res" controls src={item}></video>
                                            </div>
                                        ))}

                                    </div>
                                }
                            </div>
                        }
                        {activeTab === 'get' &&
                            <div className="media-library-content-get flex ai-center jc-spaceb">
                                {videos.map((video, index) => (
                                    <>
                                        <div
                                            onClick={() => {
                                                if (arrCompare.some(item => item === video) === false) {
                                                    setArrCompare(prev => [...prev, video])
                                                } else {
                                                    let newData = [...arrCompare];
                                                    setArrCompare(newData.filter(item => item !== video))

                                                }
                                            }}
                                            className={arrCompare.some(item => item === video) === true ? "media-library-content-get-item active flex" : "media-library-content-get-item  flex"}>
                                            {arrCompare.some(item => item === video) === true &&
                                                <div
                                                    className="media-library-content-get-item-check flex ai-center jc-center">
                                                    <Check />
                                                    <Minus />
                                                </div>
                                            }
                                            <video loading="lazy" className="img-res" src={`http://localhost/physiosystem/server/files/${video.src}`}></video>
                                        </div>
                                    </>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }

        </>
    )
}