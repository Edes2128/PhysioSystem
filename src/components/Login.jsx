import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login({ history }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault();

        let payload = {
            username,
            password
        }

        axios.post('http://localhost/physiosystem/server/user/login', payload).then(res => {
            if (res.data.status === 1 && res.data.role === 2) {
                history.push('/fizio')
            } else if (res.data.status === 1 && res.data.role === 3) {
                history.push('/client')
            }
        })
    }

    return (
        <div className="login flex ai-center jc-center" >
            <form onSubmit={login} className="login-form flex fd-column ai-center">
                <div className="login-form-logo">
                    <img className="img-res" src="/images/logo-orange.png" alt="" />
                </div>
                <div className="login-form-inputs flex fd-column ai-start">
                    <label className="fs-16 fw-regular" htmlFor="#">Username</label>
                    <input className="fs-16 fw-regular" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="login-form-inputs flex fd-column ai-start">
                    <label className="fs-16 fw-regular" htmlFor="#">Password</label>
                    <input className="fs-16 fw-regular" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="login-form-login fs-16 fw-regular" >Login</button>
                <div className="login-form-links flex jc-spaceb ai-center" >
                    <Link className="login-form-links-register-link fs-14 fw-medium" to="/register" >Doesnt have an account?</Link>
                    <p className="login-form-links-password-forget fs-14 fw-medium" >Forget password?</p>
                </div>
            </form>
        </div>
    )
}
