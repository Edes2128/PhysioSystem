import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import ClientContext from '../context/klient/klientContext'
import AlertContext from '../context/alerts/AlertContext'
import queryString from 'query-string'

export default function Login({ history }) {

    const location = useLocation()
    const productId = queryString.parse(location.search)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const clientContext = useContext(ClientContext);
    const { setCurrentUser } = clientContext;
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const login = (e) => {
        if (username === "" || password === "") {
            setAlert('Fill all the fields', 'error')
            e.preventDefault()
        } else {
            e.preventDefault();
            var payload = {
                username,
                password
            }
            if (location.search) {
                axios.post('https://physiosystem.alcodeit.com/user/login', payload).then(res => {
                    if (res.data.status === 1 && res.data.role === 3) {
                        axios.post('https://physiosystem.alcodeit.com/client/checkPaketLogin', { user_id: res.data.id, package_id: productId.product_id }).then(res => {
                            if (res.data.status === 2) {
                                setAlert(`${res.data.message}`, 'info')
                            } else if (res.data.status === 1) {
                                setAlert(`${res.data.message}`, 'success')
                            } else {
                                setAlert(`${res.data.message}`, 'error')
                            }
                        })
                        setTimeout(() => history.push('/shop/cart'), 1500)
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("op", res.data.id);
                        axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                            setCurrentUser(res.data[0])
                        })
                        localStorage.setItem("el", res.data.role);
                    } else if (res.data.status === 1 && res.data.role === 2) {
                        history.push('/fizio')
                        body.classList.remove('white-body')
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("op", res.data.id);
                        localStorage.setItem("el", res.data.role);
                        setAlert(`${res.data.message}`, 'success')

                    } else {
                        setAlert(`${res.data.message}`, 'error')
                    }
                })
            } else {
                var body = document.querySelector('#body');
                axios.post('https://physiosystem.alcodeit.com/user/login', payload).then(res => {
                    if (res.data.status === 1 && res.data.role === 2) {
                        history.push('/fizio')
                        body.classList.remove('white-body')
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("op", res.data.id);
                        localStorage.setItem("el", res.data.role);
                        setAlert(`${res.data.message}`, 'success')
                        body.classList.remove('white-body')
                    } else if (res.data.status === 1 && res.data.role === 3) {
                        history.push('/shop')
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("op", res.data.id);
                        axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                            setCurrentUser(res.data[0])
                        })
                        localStorage.setItem("el", res.data.role);
                        body.classList.add('white-body')
                        setAlert(`${res.data.message}`, 'success')
                    } else {
                        setAlert(`${res.data.message}`, 'error')
                    }
                })
            }
        }
    }

    return (
        <div className="login flex ai-center jc-center" >
            <form onSubmit={login} className="login-form flex fd-column ai-center">
                <div className="login-form-logo">
                    <img className="img-res" src="/images/orange.png" alt="" />
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
                    <Link className="login-form-links-register-link fs-14 fw-medium" to="/register" >Doesn't have an account?</Link>
                    <Link className="login-form-links-password-forget fs-14 fw-medium" to='/forgot' >Forgot password?</Link>
                </div>
            </form>
        </div>
    )
}
