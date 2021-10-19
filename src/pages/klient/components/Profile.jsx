import React, { useState, useContext, useEffect } from 'react'
import { ReactComponent as SepTabs } from '../../../images/sep-tabs.svg'
// import { ReactComponent as HidePass } from '../../../images/hide-pass.svg'
import { ReactComponent as Pencil } from '../../../images/pencil.svg'
import ClientContext from '../../../context/klient/klientContext';
import axios from 'axios';
import AlertContext from '../../../context/alerts/AlertContext';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('general')
    const clientContext = useContext(ClientContext)
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { currentUser, setCurrentUser } = clientContext;
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')

    const changePas = () => {
        if (newPassword === "" || oldPassword === "") {
            setAlert('Please fill the fields', 'error')
        } else {
            axios.post('https://physiosystem.alcodeit.com/user/changePassword', { oldPassword, newPassword, token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                if (res.data.status === 1) {
                    setAlert(`${res.data.message}`, 'success')
                    setOldPassword('')
                    setNewPassword('')
                } else {
                    setAlert(`${res.data.message}`, 'error')
                }
            })
        }
    }

    const changeGeneral = () => {
        const fd = new FormData();
        fd.append('name', currentUser.name)
        fd.append('email', currentUser.email)
        fd.append('country', currentUser.country)
        fd.append('city', currentUser.city)
        fd.append('postal_code', currentUser.postal_code)
        fd.append('image', image)
        fd.append('token', JSON.parse(localStorage.getItem('token')))
        fd.append('image_name', currentUser.image_profile)

        axios.post('https://physiosystem.alcodeit.com/user/changeGeneral', fd).then(res => {
            if (res.data.status === 1) {
                setAlert(`${res.data.message}`, 'success')
                setPreview('')
                setImage('')
                axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                    setCurrentUser(res.data[0])
                })
            } else {
                setAlert(`${res.data.message}`, 'error')
            }
        })
    }

    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
            setCurrentUser(res.data[0])
        })
    }, [])

    return (
        <>
            <div className="profile flex fd-column ai-start" >
                <p className="profile-title fs-38 fw-semib">Profile</p>
                <div className="profile-tabs flex ai-center" >
                    <p
                        className={activeTab === 'general' ? "profile-tabs-active fs-20 fw-regular" : "fs-20 fw-regular"}
                        onClick={() => setActiveTab('general')}
                    >
                        General
                    </p>
                    <SepTabs />
                    <p
                        className={activeTab === 'password' ? "profile-tabs-active fs-20 fw-regular" : "fs-20 fw-regular"}
                        onClick={() => setActiveTab('password')}
                    >
                        Password
                    </p>
                </div>
                {activeTab === "general" ?
                    <div className="profile-general flex fd-column ai-center">
                        <div className="profile-general-image flex jc-center ai-center">
                            {preview !== "" && image !== "" ?

                                <img src={preview} className="img-res" alt="" />
                                :
                                <img loading='lazy' src={currentUser.image_profile === "" || currentUser.image_profile === undefined ? "/images/profile-big.jpg" : `https://physiosystem.alcodeit.com/files/${currentUser.image_profile}`} className="img-res" alt="" />

                            }

                            <label htmlFor="image-profile" className="profile-general-image-edit flex ai-center jc-center">
                                <Pencil />
                            </label>
                            <input type="file" hidden accept="image/*" id="image-profile"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                    setPreview(URL.createObjectURL(e.target.files[0]))
                                    setCurrentUser(prev => ({
                                        ...prev,
                                        image_profile: ""
                                    }))

                                }}
                            />
                        </div>
                        <div className="profile-general-inputs flex ai-center jc-spaceb">
                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Name</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser && currentUser.name}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))
                                    }} />
                            </div>

                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Email</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser && currentUser.email}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="profile-general-inputs flex ai-center jc-spaceb">
                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Country</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser && currentUser.country}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            country: e.target.value
                                        }))
                                    }}
                                />
                            </div>

                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">City</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser && currentUser.city}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            city: e.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="profile-general-inputs flex ai-end jc-spaceb">
                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Postal Code</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser && currentUser.postal_code}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            postal_code: e.target.value
                                        }))
                                    }}
                                />
                            </div>

                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <button onClick={changeGeneral} className="profile-general-inputs-item-btn-save fs-20 fw-regular">Save</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="profile-password flex fd-column ai-start">
                        <div className="profile-password-inputs flex ai-center jc-spaceb">
                            <div className="profile-password-inputs-item flex fd-column ai-start">
                                <label htmlFor="#">Old Password</label>
                                <div className="profile-password-inputs-item-pass flex ai-center jc-spaceb" >
                                    <input className="fs-20 fw-regular" type="password" onChange={(e) => {
                                        setOldPassword(e.target.value)
                                    }} />
                                    {/* <HidePass /> */}
                                </div>
                            </div>
                            <div className="profile-password-inputs-item flex fd-column ai-start">
                                <label htmlFor="#">New Password</label>
                                <div className="profile-password-inputs-item-pass flex ai-center jc-spaceb" >
                                    <input className="fs-20 fw-regular" type="password"
                                        onChange={(e) => {
                                            setNewPassword(e.target.value)
                                        }}
                                    />
                                    {/* <HidePass /> */}
                                </div>
                            </div>
                        </div>
                        <button onClick={changePas} type="button" className="profile-password-btn-ruaj fs-20 fw-regular">Save</button>
                    </div>
                }
            </div>
        </>
    )
}
