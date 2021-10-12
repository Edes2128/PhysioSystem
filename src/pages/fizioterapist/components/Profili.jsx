import React, { useContext, useState } from 'react'
import axios from 'axios'
import AlertContext from '../../../context/alerts/AlertContext'
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";


export default function Profili() {


    const [srcImg, setSrcImg] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({
        unit: 'px', // default, can be 'px' or '%'
        x: 130,
        y: 50,
        width: 800,
        height: 400,
        resize: false
    });
    const [result, setResult] = useState(null);

    const getCroppedImg = () => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setResult(base64Image);
        console.log(result);

    }




    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    return (
        <div className="coach-profili flex fd-column ai-start" >
            <p className="coach-profili-title fs-30 fw-semib">Password</p>
            <div className="coach-profili-pass flex ai-end jc-spaceb">
                <div className="coach-profili-pass-item flex fd-column ai-start">
                    <label className="fs-18 fw-regular" htmlFor="#">Old Password</label>
                    <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="fs-18 fw-regular" type="text" placeholder="Old Password..." />
                </div>

                <div className="coach-profili-pass-item flex fd-column ai-start">
                    <label className="fs-18 fw-regular" htmlFor="#">New Password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="fs-18 fw-regular" type="text" placeholder="New Password..." />
                </div>
                <button className="fs-18 fw-regular"
                    onClick={() => {
                        axios.post('https://physiosystem.alcodeit.com/user/changePassword', { token: JSON.parse(localStorage.getItem('token')), newPassword, oldPassword }).then(res => {
                            if (res.data.status === 1) {
                                setNewPassword('')
                                setOldPassword('')
                                setAlert(`${res.data.message}`, 'success')
                            } else {
                                setAlert(`${res.data.message}`, 'error')
                            }
                        })
                    }}
                >Ruaj</button>
            </div>

            {srcImg &&
                <ReactCrop
                    src={srcImg}
                    style={{ maxWidth: "100%" }}
                    crop={crop}
                    onChange={setCrop}
                    maxHeight={400}
                    maxWidth={800}
                    minHeight={400}
                    minWidth={800}
                    onImageLoaded={setImage}
                />
            }

            {console.log(image)}

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setSrcImg(URL.createObjectURL(e.target.files[0]))
                }}
            />
            <img src={result} className='img-res' alt="" />
            <button onClick={getCroppedImg} >Crop</button>
        </div>
    )
}