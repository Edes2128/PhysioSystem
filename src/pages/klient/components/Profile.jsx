import React, { useState, useContext } from 'react'
import { ReactComponent as SepTabs } from '../../../images/sep-tabs.svg'
import { ReactComponent as HidePass } from '../../../images/hide-pass.svg'
import { ReactComponent as Pencil } from '../../../images/pencil.svg'
import ClientContext from '../../../context/klient/klientContext';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('general')
    const clientContext = useContext(ClientContext)
    const { currentUser, setCurrentUser } = clientContext;

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
                            <img src="/images/profile-big.jpg" className="img-res" alt="" />
                            <div className="profile-general-image-edit flex ai-center jc-center">
                                <Pencil />
                            </div>
                        </div>
                        <div className="profile-general-inputs flex ai-center jc-spaceb">
                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Name</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser.name}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))
                                    }} />
                            </div>

                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <label className="fs-20 fw-medium" htmlFor="#">Email</label>
                                <input className="fs-20 fw-regular" type="text" value={currentUser.email}
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
                                <input className="fs-20 fw-regular" type="text" value={currentUser.country}
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
                                <input className="fs-20 fw-regular" type="text" value={currentUser.city}
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
                                <input className="fs-20 fw-regular" type="text" value={currentUser.postal_code}
                                    onChange={(e) => {
                                        setCurrentUser(prev => ({
                                            ...prev,
                                            postal_code: e.target.value
                                        }))
                                    }}
                                />
                            </div>

                            <div className="profile-general-inputs-item flex fd-column ai-start">
                                <button className="profile-general-inputs-item-btn-save fs-20 fw-regular">Save</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="profile-password flex fd-column ai-start">
                        <div className="profile-password-inputs flex ai-center jc-spaceb">
                            <div className="profile-password-inputs-item flex fd-column ai-start">
                                <label htmlFor="#">Old Password</label>
                                <div className="profile-password-inputs-item-pass flex ai-center jc-spaceb" >
                                    <input className="fs-20 fw-regular" type="password" />
                                    <HidePass />
                                </div>
                            </div>
                            <div className="profile-password-inputs-item flex fd-column ai-start">
                                <label htmlFor="#">New Password</label>
                                <div className="profile-password-inputs-item-pass flex ai-center jc-spaceb" >
                                    <input className="fs-20 fw-regular" type="password" />
                                    <HidePass />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="profile-password-btn-ruaj fs-20 fw-regular">Save</button>
                    </div>
                }
            </div>
        </>
    )
}
