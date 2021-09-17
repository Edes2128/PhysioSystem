import React, { useContext, useState } from 'react'
import axios from 'axios'
import AlertContext from '../../../context/alerts/AlertContext'

export default function Profili() {

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
                        axios.post('http://localhost/physiosystem/server/user/changePassword', { token: JSON.parse(localStorage.getItem('token')), newPassword, oldPassword }).then(res => {
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
        </div>
    )
}