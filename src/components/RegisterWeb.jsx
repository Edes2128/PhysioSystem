import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import ClientContext from '../context/klient/klientContext';
import AlertContext from '../context/alerts/AlertContext'
import queryString from 'query-string'
export default function RegisterWeb({ history }) {
    const location = useLocation()
    const productId = queryString.parse(location.search)
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const clientContext = useContext(ClientContext);
    const { setCurrentUser } = clientContext;

    const register = (e) => {

        if (name === "" || email === "" || username === "" || password === "") {
            setAlert('Please fill all the fields', 'error')
            e.preventDefault()
        } else {
            e.preventDefault()
            let payload = {
                username,
                name,
                email,
                password,
            }

            axios.post('https://physiosystem.alcodeit.com/user/registerClientWeb', payload).then(res => {
                if (res.data.status === 1) {
                    const body = document.querySelector('#body');
                    body.classList.add('white-body')

                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("op", res.data.id);
                    localStorage.setItem("el", 3);
                    axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                        setCurrentUser(res.data[0])
                        axios.post('https://physiosystem.alcodeit.com/client/checkPaketLogin', { user_id: res.data[0].id, package_id: productId.product_id }).then(res => {
                            if (res.data.status === 2) {
                                setAlert(`${res.data.message}`, 'info')
                            } else if (res.data.status === 1) {
                                setAlert(`${res.data.message}`, 'success')
                            } else {
                                setAlert(`${res.data.message}`, 'error')
                            }
                            setTimeout(() => history.push('/shop/cart'), 1500)
                        })
                    })
                } else {
                    setAlert(`${res.data.message}`, "error")
                }
            })
        }
    }
    return (
        <div className="register flex jc-center ai-center">
            <form onSubmit={register} className="register-form flex fd-column ai-center">
                <div className="register-form-logo">
                    <img src="/images/orange.png" alt="" />
                </div>
                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Fullname</label>
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
                <div className="register-form-links flex ai-center jc-spaceb">
                    <Link className="fs-14 fw-medium" to={`/?product_id=${productId.product_id}`} >Already a member?</Link>
                    <a className='fs-14 fw-medium' href="https://onphysiopal.alcodeit.com/why-login/">Why signup?</a>
                </div>
            </form>
        </div>
    )
}
