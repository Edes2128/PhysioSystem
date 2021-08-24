import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const register = (e) => {
        e.preventDefault()
    }

    return (
        <div className="register flex jc-center ai-center">
            <form onSubmit={register} className="register-form flex fd-column ai-center">
                <div className="register-form-logo">
                    <img src="/images/logo-orange.png" alt="" />
                </div>
                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Name</label>
                    <input className="fs-16 fw-regular" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Email</label>
                    <input className="fs-16 fw-regular" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Username</label>
                    <input className="fs-16 fw-regular" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Password</label>
                    <input className="fs-16 fw-regular" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="register-form-submit-btn fs-16 fw-regular" >Register</button>
                <div className="register-form-links flex ai-center jc-start">
                    <Link className="fs-14 fw-medium" to="/" >Already a member?</Link>
                </div>
            </form>
        </div>
    )
}
