import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import AlertContext from '../../../context/alerts/AlertContext';
import MediaContext from '../../../context/media/MediaContext';

export default function ShtoPaket() {
    const alertContext = useContext(AlertContext);
    const mediaContext = useContext(MediaContext);
    const {
        setShowMedia,
        setArrCompare,
        arrCompare,
        arrName,
        setArrName,
    } = mediaContext;
    const [title, setTitle] = useState('')
    const [pershkrimi, setPershkrimi] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [price, setPrice] = useState('')
    const [videos, setVideos] = useState([])
    const [days, setDays] = useState([
        {
            titulli: '',
            pershkrimi: '',
            pdf: '',
            pdf_name: '',
            day_videos: [],
        }
    ])
    const [btnSub, setBtnSub] = useState(false)
    useEffect(() => {
        if (arrName !== '' && arrCompare.length !== 0) {
            if (arrName === true) {
                setVideos(arrCompare)
            } else {
                const item = days[arrName].day_videos = arrCompare
                setDays(prev => [...prev], item)
            }
        }
    }, [arrName, arrCompare])

    let dayVideos = days.map(item => item.day_videos);
    let daysPdf = days.map(item => item.pdf);

    const addPackage = (e) => {
        e.preventDefault('');
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('pershkrimi', pershkrimi);
        formdata.append('price', price);
        formdata.append('cover', image);
        // const videos_day2 = JSON.stringify(dayVideos)
        // formdata.append(`video_days[]`, JSON.stringify(videos_day2));

        const demo2 = JSON.stringify(videos)
        formdata.append(`video_demo[]`, demo2);


        let dayss = JSON.stringify(days)
        formdata.append('days', dayss)

        Array.from(daysPdf).forEach(pdf => {
            formdata.append(`days-pdf[]`, pdf)
        })



        axios.post('http://localhost/physiosystem/server/fizio/addPackage', formdata).then(res => {
            if (res.status === 200) {

                setTitle('');
                setPershkrimi('')
                setImage('')
                setPreviewImage('')
                setPrice('')
                setVideos([])
                setDays([{
                    titulli: '',
                    pershkrimi: '',
                    pdf: '',
                    pdf_name: '',
                    day_videos: [],
                    day_videos_local: [],
                    day_videos_names: []
                }])
                setBtnSub(false)
            } else {
                setBtnSub(false)
            }
        })
    }

    const removeVideo = (index2, video) => {
        let newdata2 = [...videos];
        setVideos(newdata2.filter((item, index) => index !== index2))
    }

    const removeVideoDay = (index, index2, video) => {
        let newdata = [...days];
        let item = newdata[index]
        item.day_videos.splice(index2, 1)
        setDays(prev => [...prev], item)
    }

    const addDay = () => {
        setDays(prev => [...prev, { titulli: '', pershkrimi: '', pdf: '', pdf_name: '', day_videos: [], day_videos_local: [], day_videos_names: [] }])
    }

    const removeDay = (indexItem) => {
        const newData = [...days]
        const itemToRemove = days[indexItem];
        setDays(newData.filter(item => item !== itemToRemove))
    }

    return (
        <div className="shtopaket" >
            <p className="shtopaket-title fs-30 fw-semib" >Shto Paket</p>
            <form className="shtopaket-form flex fd-column ai-start" onSubmit={addPackage}>

                <div className="shtopaket-form-inputs flex jc-spaceb">
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                        <input className="fs-18 fw-regular" type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Pershkrimi</label>
                        <input className="fs-18 fw-regular" type="text" name="" id="" value={pershkrimi} onChange={(e) => setPershkrimi(e.target.value)} />
                    </div>
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Cmimi</label>
                        <input className="fs-18 fw-regular" type="number" name="" id="" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                </div>
                <div className="shtopaket-form-image flex fd-column ai-start" >
                    <label className="shtopaket-form-image-title fs-18 fw-regular" htmlFor="#">Fotoja e paketes</label>
                    {previewImage === "" ?
                        <>
                            <label htmlFor="foto-cover" className="shtopaket-form-image-upload-btn flex ai-center jc-center fs-18 fw-regular">Ngarko Foton
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 256.000000 256.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                                        fill="#fff" stroke="none">
                                        <path d="M182 2287 c-47 -15 -116 -79 -141 -132 -21 -45 -21 -50 -21 -886 0
                                 -632 3 -852 12 -883 16 -55 99 -138 154 -154 60 -17 2128 -17 2188 0 58 17
                                 138 99 154 158 9 31 12 111 10 255 l-3 210 -27 9 c-18 6 -38 6 -55 0 l-28 -9
                                 -5 -207 c-5 -226 -7 -233 -74 -282 -27 -21 -38 -21 -802 -24 -481 -2 -774 1
                                 -774 7 0 21 79 201 117 266 205 351 516 538 959 576 154 13 338 3 536 -31 101
                                 -18 115 -18 135 -5 l23 15 0 462 c0 332 -3 472 -12 502 -16 55 -99 138 -154
                                 154 -55 16 -2142 16 -2192 -1z m2164 -133 c15 -11 37 -33 48 -48 20 -26 21
                                 -42 24 -422 2 -222 -1 -394 -6 -394 -5 0 -55 6 -113 14 -309 42 -599 23 -839
                                 -55 -239 -78 -467 -245 -612 -449 -65 -92 -140 -237 -184 -358 l-38 -104 -192
                                 4 c-211 3 -219 6 -268 72 -21 27 -21 38 -24 799 -2 425 0 796 3 826 8 64 51
                                 118 105 131 19 4 493 7 1052 7 1010 -2 1017 -2 1044 -23z"/>
                                        <path d="M620 1931 c-86 -28 -168 -98 -211 -181 -21 -39 -24 -59 -24 -150 0
                                 -96 3 -110 28 -158 132 -251 485 -251 613 0 39 76 45 199 13 282 -27 73 -94
                                 148 -164 184 -41 21 -66 26 -140 29 -49 1 -101 -1 -115 -6z m222 -156 c119
                                 -85 119 -265 0 -349 -59 -42 -151 -48 -217 -16 -88 43 -136 145 -111 239 28
                                 108 105 164 218 159 55 -3 75 -9 110 -33z"/>
                                    </g>
                                </svg>
                            </label>
                            <input type="file" accept="image/*" hidden id="foto-cover" onChange={(e) => {
                                setImage(e.target.files[0])
                                setPreviewImage(URL.createObjectURL(e.target.files[0]))
                            }} />
                        </>
                        :
                        <div className="shtopaket-form-image-preview flex fd-column ai-center" >
                            <div className="flex" >
                                <img src={previewImage} className="img-res" alt="" />
                            </div>
                            <button onClick={() => {
                                setPreviewImage("")
                                setImage("")
                            }}
                                className="shtopaket-form-image-preview-delete fs-18 fw-regular flex ai-center" >Fshi Foton

                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 788.000000 980.000000"
                                    preserveAspectRatio="xMidYMid meet">
                                    <metadata>
                                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                                    </metadata>
                                    <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"
                                        fill="#ffffff" stroke="none">
                                        <path d="M2445 9785 c-232 -51 -410 -208 -493 -437 l-27 -73 -3 -347 -3 -347
                                        -687 -3 -687 -3 -70 -24 c-112 -37 -193 -87 -281 -175 -65 -65 -89 -98 -122
                                        -166 -64 -134 -72 -193 -72 -540 l0 -300 3941 0 3940 0 -3 333 c-4 314 -5 336
                                        -27 402 -36 110 -87 193 -170 276 -85 85 -149 124 -266 166 l-80 28 -592 3
                                        -591 3 -5 332 c-5 373 -8 392 -80 532 -58 114 -172 226 -287 282 -157 77 -56
                                        73 -1757 72 -1219 0 -1530 -3 -1578 -14z m3095 -910 l0 -305 -1512 2 -1513 3
                                        -3 303 -2 302 1515 0 1515 0 0 -305z"/>
                                        <path d="M612 3643 l3 -3098 23 -70 c40 -118 81 -184 172 -276 70 -71 100 -94
                                        170 -127 163 -78 -81 -72 2970 -72 3051 0 2807 -6 2970 72 153 73 283 226 342
                                        403 l23 70 3 3098 2 3097 -3340 0 -3340 0 2 -3097z m1808 -248 l0 -2155 -295
                                        0 -295 0 0 2155 0 2155 295 0 295 0 0 -2155z m1210 0 l0 -2155 -300 0 -300 0
                                        0 2155 0 2155 300 0 300 0 0 -2155z m1210 0 l0 -2155 -295 0 -295 0 0 2155 0
                                        2155 295 0 295 0 0 -2155z m1210 0 l0 -2155 -300 0 -300 0 0 2155 0 2155 300
                                        0 300 0 0 -2155z"/>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    }
                </div>
                <div className="shtopaket-form-video flex fd-column ai-start">
                    <div className="flex ai-center" >
                        <p style={{ marginRight: '20px' }} className="fs-18 fw-regular" >Shto Videot Demo</p>
                        {videos.length !== 0 && <>
                            <label
                                onClick={() => {
                                    setShowMedia(true)
                                    setArrCompare(videos)
                                    setArrName(true)
                                }}
                                style={{ marginTop: '0' }} className="shtopaket-form-video-upload-btn fs-18 fw-regular flex ai-center" >
                                Shto video te tjera
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 235.000000 214.000000"
                                    preserveAspectRatio="xMidYMid meet">
                                    <metadata>
                                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                                    </metadata>
                                    <g transform="translate(0.000000,214.000000) scale(0.100000,-0.100000)"
                                        fill="#ffffff" stroke="none">
                                        <path d="M315 2112 c-78 -27 -138 -66 -193 -127 -59 -65 -96 -137 -111 -219
                                            -15 -83 -15 -1325 0 -1398 29 -136 121 -253 247 -315 l76 -38 840 0 841 0 68
                                            32 c80 38 173 122 210 191 55 102 57 120 57 823 0 425 -4 666 -11 705 -25 138
                                            -117 257 -247 321 l-76 38 -825 2 c-764 2 -830 1 -876 -15z m265 -119 c-1 -5
                                            -38 -87 -84 -183 l-83 -175 -136 -3 -137 -3 0 49 c0 151 113 287 257 312 63
                                            10 183 12 183 3z m610 -2 c0 -5 -38 -88 -84 -185 l-85 -176 -240 0 c-133 0
                                            -241 2 -241 4 0 3 21 49 46 103 25 54 63 135 85 181 l38 82 241 0 c136 0 240
                                            -4 240 -9z m600 2 c-1 -5 -38 -87 -84 -183 l-83 -175 -236 -3 c-131 -1 -237 0
                                            -237 2 0 3 32 71 71 153 39 81 77 163 85 181 l14 32 235 0 c129 0 235 -3 235
                                            -7z m265 -42 c92 -51 155 -162 155 -273 l0 -48 -230 0 c-126 0 -230 2 -230 5
                                            0 2 23 53 51 112 28 59 66 140 84 180 l34 71 43 -9 c24 -6 66 -23 93 -38z
                                            m155 -999 c0 -601 0 -598 -68 -687 -27 -36 -57 -60 -106 -85 l-69 -35 -791 0
                                            -791 0 -56 26 c-69 33 -127 89 -160 155 l-24 49 -3 558 -3 557 1036 0 1035 0
                                            0 -538z"/>
                                        <path d="M936 1208 c-14 -19 -16 -73 -16 -385 0 -500 -21 -487 356 -225 141
                                            97 261 187 267 199 21 47 -4 71 -268 256 -211 146 -261 177 -289 177 -25 0
                                            -39 -7 -50 -22z"/>
                                    </g>
                                </svg>
                            </label>
                        </>}

                    </div>
                    {videos.length === 0 ?
                        <>
                            <label className="shtopaket-form-video-upload-btn fs-18 fw-regular flex ai-center"
                                onClick={() => {
                                    setShowMedia(true)
                                    setArrCompare(videos)
                                    setArrName(true)
                                }}
                            >Ngarko Videot
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 235.000000 214.000000"
                                    preserveAspectRatio="xMidYMid meet">
                                    <metadata>
                                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                                    </metadata>
                                    <g transform="translate(0.000000,214.000000) scale(0.100000,-0.100000)"
                                        fill="#ffffff" stroke="none">
                                        <path d="M315 2112 c-78 -27 -138 -66 -193 -127 -59 -65 -96 -137 -111 -219
                                -15 -83 -15 -1325 0 -1398 29 -136 121 -253 247 -315 l76 -38 840 0 841 0 68
                                32 c80 38 173 122 210 191 55 102 57 120 57 823 0 425 -4 666 -11 705 -25 138
                                -117 257 -247 321 l-76 38 -825 2 c-764 2 -830 1 -876 -15z m265 -119 c-1 -5
                                -38 -87 -84 -183 l-83 -175 -136 -3 -137 -3 0 49 c0 151 113 287 257 312 63
                                10 183 12 183 3z m610 -2 c0 -5 -38 -88 -84 -185 l-85 -176 -240 0 c-133 0
                                -241 2 -241 4 0 3 21 49 46 103 25 54 63 135 85 181 l38 82 241 0 c136 0 240
                                -4 240 -9z m600 2 c-1 -5 -38 -87 -84 -183 l-83 -175 -236 -3 c-131 -1 -237 0
                                -237 2 0 3 32 71 71 153 39 81 77 163 85 181 l14 32 235 0 c129 0 235 -3 235
                                -7z m265 -42 c92 -51 155 -162 155 -273 l0 -48 -230 0 c-126 0 -230 2 -230 5
                                0 2 23 53 51 112 28 59 66 140 84 180 l34 71 43 -9 c24 -6 66 -23 93 -38z
                                m155 -999 c0 -601 0 -598 -68 -687 -27 -36 -57 -60 -106 -85 l-69 -35 -791 0
                                -791 0 -56 26 c-69 33 -127 89 -160 155 l-24 49 -3 558 -3 557 1036 0 1035 0
                                0 -538z"/>
                                        <path d="M936 1208 c-14 -19 -16 -73 -16 -385 0 -500 -21 -487 356 -225 141
                                97 261 187 267 199 21 47 -4 71 -268 256 -211 146 -261 177 -289 177 -25 0
                                -39 -7 -50 -22z"/>
                                    </g>
                                </svg>
                            </label>
                        </>
                        :
                        <>
                            <div className="shtopaket-form-video-preview flex ai-center " >
                                {videos.map((video, index) => (
                                    <div key={index} className="shtopaket-form-video-preview-item flex fd-column ai-center" >
                                        <div className="flex" >
                                            <video className="img-res" controls src={`http://localhost/physiosystem/server/files/${video.src}`}></video>
                                        </div>
                                        <button type="button" className="shtopaket-form-video-preview-item-fshi-btn fs-18 fw-regular flex ai-center"
                                            onClick={() => {
                                                removeVideo(index, video)
                                            }}
                                        >
                                            Fshi Videon
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="20" height="20" viewBox="0 0 788.000000 980.000000"
                                                preserveAspectRatio="xMidYMid meet">
                                                <metadata>
                                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                                </metadata>
                                                <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"
                                                    fill="#ffffff" stroke="none">
                                                    <path d="M2445 9785 c-232 -51 -410 -208 -493 -437 l-27 -73 -3 -347 -3 -347
                                                    -687 -3 -687 -3 -70 -24 c-112 -37 -193 -87 -281 -175 -65 -65 -89 -98 -122
                                                    -166 -64 -134 -72 -193 -72 -540 l0 -300 3941 0 3940 0 -3 333 c-4 314 -5 336
                                                    -27 402 -36 110 -87 193 -170 276 -85 85 -149 124 -266 166 l-80 28 -592 3
                                                    -591 3 -5 332 c-5 373 -8 392 -80 532 -58 114 -172 226 -287 282 -157 77 -56
                                                    73 -1757 72 -1219 0 -1530 -3 -1578 -14z m3095 -910 l0 -305 -1512 2 -1513 3
                                                    -3 303 -2 302 1515 0 1515 0 0 -305z"/>
                                                    <path d="M612 3643 l3 -3098 23 -70 c40 -118 81 -184 172 -276 70 -71 100 -94
                                                    170 -127 163 -78 -81 -72 2970 -72 3051 0 2807 -6 2970 72 153 73 283 226 342
                                                    403 l23 70 3 3098 2 3097 -3340 0 -3340 0 2 -3097z m1808 -248 l0 -2155 -295
                                                    0 -295 0 0 2155 0 2155 295 0 295 0 0 -2155z m1210 0 l0 -2155 -300 0 -300 0
                                                    0 2155 0 2155 300 0 300 0 0 -2155z m1210 0 l0 -2155 -295 0 -295 0 0 2155 0
                                                    2155 295 0 295 0 0 -2155z m1210 0 l0 -2155 -300 0 -300 0 0 2155 0 2155 300
                                                    0 300 0 0 -2155z"/>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                ))
                                }
                            </div>
                        </>
                    }
                </div>

                <div className="shtopaket-form-days flex fd-column ai-start">

                    <p className="shtopaket-form-days-title fs-20 fw-regular" >Ditet e Paktes</p>
                    {days.map((day, index) => (
                        <div className="shtopaket-form-days-item" >
                            <div
                                onClick={() => addDay()}
                                className="shtopaket-form-days-item-add flex ai-center jc-center fs-30"
                                style={{ display: days.length === index + 1 ? 'flex' : 'none' }}
                            >+
                            </div>
                            <div
                                onClick={() => removeDay(index)}
                                className="shtopaket-form-days-item-remove flex ai-center jc-center fs-30"
                                style={{ display: days.length === 1 ? 'none' : 'flex' }}
                            >
                                -
                            </div>

                            <div className="shtopaket-form-days-item-top flex ai-end jc-spaceb">
                                <div className="shtopaket-form-days-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                                    <input
                                        className="fs-18 fw-regular"
                                        type="text"
                                        placeholder="Dita 1"
                                        value={day.titulli}
                                        onChange={(e) => {
                                            let newdata = [...days];
                                            const item = newdata[index];
                                            item.titulli = e.target.value;
                                            setDays(prev => [...prev], item)
                                        }}
                                    />
                                </div>
                                <div className="shtopaket-form-days-item-top-input flex fd-column ai-start">
                                    <label className="fs-18 fw-regular" htmlFor="#">Pershkrimi</label>
                                    <input
                                        value={day.pershkrimi}
                                        onChange={(e) => {
                                            let newdata = [...days];
                                            const item = newdata[index];
                                            item.pershkrimi = e.target.value;
                                            setDays(prev => [...prev], item)
                                        }}
                                        className="fs-18 fw-regular" type="text" placeholder="Blabla..." />
                                </div>
                                <div className="shtopaket-form-days-item-top-btn flex " >

                                    {day.pdf === "" ?
                                        <>
                                            <label htmlFor={`pdf-day-${index}`}>Shto PDF</label>
                                            <input onChange={(e) => {
                                                const newData = [...days];
                                                const item = newData[index]
                                                item.pdf = e.target.files[0]
                                                item.pdf_name = e.target.files[0].name
                                                setDays(prev => [...prev], item)
                                            }}
                                                type="file"
                                                accept="application/pdf, .pdf"
                                                hidden
                                                id={`pdf-day-${index}`}
                                            />
                                        </>
                                        :
                                        <div className="shtopaket-form-days-item-top-btn-preview flex fd-column ai-center" >
                                            <button
                                                onClick={() => {
                                                    const data = [...days]
                                                    const item = data[index]
                                                    item.pdf = ''
                                                    item.pdf_name = ''
                                                    setDays(prev => [...prev], item)
                                                }}
                                                type="button" >X</button>
                                            <div className="flex" >
                                                <img src="/images/pdf.png" className="img-res" alt="" />
                                            </div>
                                            <p className="fs-16 fw-light" >{day.pdf.name}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="shtopaket-form-days-item-bottom flex fd-column ai-start ">
                                {day.day_videos.length === 0 ?
                                    <>
                                        <label onClick={() => {
                                            setShowMedia(true)
                                            setArrCompare(day.day_videos)
                                            setArrName(index)

                                        }} >Ngarko Videot</label>
                                    </>
                                    :
                                    <>
                                        <label
                                            onClick={() => {
                                                setShowMedia(true)
                                                setArrCompare(day.day_videos)
                                                setArrName(index)

                                            }}
                                            htmlFor={`video-extra-day-${index}`}>Shto Video Te Tjera</label>

                                    </>
                                }

                                {day.day_videos.length !== 0 &&

                                    <div className="shtopaket-form-days-item-bottom-preview flex  ai-end" >

                                        {day.day_videos.map((video, index2) => (
                                            <div className="shtopaket-form-days-item-bottom-preview-item flex fd-column ai-center">
                                                <div className="flex" >
                                                    <video controls src={`http://localhost/physiosystem/server/files/${video.src}`} className="img-res" ></video>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        removeVideoDay(index, index2, video)
                                                    }}
                                                    className="fs-16 fw-regular" type="button" >Fshi Videon </button>
                                            </div>
                                        ))}

                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setBtnSub(true)} style={{ display: btnSub ? 'none' : 'flex' }} className="shtopaket-form-submit-btn fs-18 fw-medium flex ai-center" type="submit"> Ruaj
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20" viewBox="0 0 452.000000 452.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <metadata>
                            Created by potrace 1.16, written by Peter Selinger 2001-2019
                        </metadata>
                        <g transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)"
                            fill="#ffffff" stroke="none">
                            <path d="M520 4139 c-60 -27 -107 -74 -136 -134 l-24 -50 0 -1695 0 -1695 24
                        -50 c29 -60 76 -107 136 -134 45 -20 57 -21 1741 -21 l1695 0 52 26 c58 29
                        106 79 133 138 18 39 19 102 19 1446 l0 1405 -393 392 -392 393 -1405 0
                        c-1391 0 -1405 -1 -1450 -21z m562 -746 l3 -578 30 -54 c35 -63 82 -105 144
                        -126 66 -22 1846 -23 1911 0 61 21 112 66 146 127 l29 53 3 545 3 544 309
                        -309 310 -310 0 -1343 0 -1343 -25 -24 -24 -25 -241 0 -240 0 0 693 c0 769 1
                        757 -65 834 -19 23 -58 53 -87 67 l-52 26 -976 0 -976 0 -52 -26 c-29 -14 -68
                        -44 -87 -67 -66 -77 -65 -65 -65 -834 l0 -693 -240 0 -241 0 -24 25 -25 24 0
                        1661 0 1661 25 24 24 25 240 0 240 0 3 -577z m2078 28 l0 -549 -26 -31 -26
                        -31 -893 0 -893 0 -26 31 -26 31 0 549 0 549 945 0 945 0 0 -549z m51 -1454
                        c39 -30 39 -37 39 -736 l0 -681 -990 0 -990 0 0 681 c0 699 0 706 39 736 23
                        18 1879 18 1902 0z"/>
                            <path d="M720 815 l0 -95 95 0 95 0 0 95 0 95 -95 0 -95 0 0 -95z" />
                            <path d="M3610 815 l0 -95 95 0 95 0 0 95 0 95 -95 0 -95 0 0 -95z" />
                            <path d="M2555 3775 l-25 -24 0 -361 0 -361 26 -24 c26 -25 30 -25 200 -25
                        168 0 174 1 201 24 l28 24 0 362 0 362 -28 24 c-27 23 -33 24 -203 24 -172 0
                        -175 0 -199 -25z m245 -385 l0 -220 -40 0 -40 0 0 220 0 220 40 0 40 0 0 -220z"/>
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    )
}