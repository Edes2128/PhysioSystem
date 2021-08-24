import React, { useState } from 'react'

export default function ShtoPaket() {


    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [price, setPrice] = useState('')
    const [videos, setVideos] = useState([])
    const [kategoria, setKategoria] = useState('')
    const [videoPreview, setVideoPreview] = useState([])


    console.log(videoPreview)
    console.log(videos)

    const addPackage = (e) => {
        e.preventDefault('');
    }


    const removeVideo = (index2, video) => {
        let newdata = [...videoPreview];
        setVideoPreview(newdata.filter(item => item !== video))


        let newdata2 = [...videos];

        setVideos(newdata2.filter((item, index) => index !== index2))

    }

    return (
        <div className="shtopaket" >
            <p className="shtopaket-title fs-30 fw-semib" >Shto Paket</p>
            <form className="shtopaket-form" onSubmit={addPackage}>

                <div className="shtopaket-form-inputs flex jc-spaceb">
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                        <input className="fs-18 fw-regular" type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Cmimi</label>
                        <input className="fs-18 fw-regular" type="number" name="" id="" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="shtopaket-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" value={kategoria} onChange={(e) => setKategoria(e.target.value)} htmlFor="#">Kategoria</label>
                        <select className="fs-18 fw-regular" >
                            <option className="fs-18 fw-regular" value="1">Kategoria 1</option>
                            <option className="fs-18 fw-regular" value="2">Kategoria 2</option>
                            <option className="fs-18 fw-regular" value="3">Kategoria 3</option>
                            <option className="fs-18 fw-regular" value="4">Kategoria 4</option>
                        </select>
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
                                setImage(e.target.files)
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
                    <p className="fs-18 fw-regular" >Shto Videot e Paketes</p>
                    {videoPreview.length === 0 && videos.length === 0 ?
                        <>
                            <label className="shtopaket-form-video-upload-btn fs-18 fw-regular flex ai-center" htmlFor="video-files">Ngarko Videot
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
                            <input
                                type="file"
                                accept="video/*"
                                multiple
                                hidden
                                id="video-files"
                                onChange={(e) => {
                                    setVideos(e.target.files)
                                    let videos2 = [];
                                    for (let i = 0; i < e.target.files.length; i++) {
                                        videos2.push(URL.createObjectURL(e.target.files[i]))
                                    }
                                    setVideoPreview(videos2)
                                    console.log(videoPreview)
                                }} />
                        </>
                        :
                        <>
                            <div className="shtopaket-form-video-preview flex ai-center" >
                                {videoPreview.map((video, index) => (
                                    <div key={index} className="shtopaket-form-video-preview-item flex fd-column ai-center" >
                                        <div className="flex" >
                                            <video className="img-res" autoPlay controls src={video}></video>
                                        </div>
                                        <button className="shtopaket-form-video-preview-item-fshi-btn fs-18 fw-regular flex ai-center"
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
            </form>
        </div>
    )
}
