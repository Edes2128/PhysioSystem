import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ClientContext from '../context/klient/klientContext';
import AlertContext from '../context/alerts/AlertContext'

export default function Register({ history }) {

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const clientContext = useContext(ClientContext);
    const { setCurrentUser } = clientContext;

    const register = (e) => {

        if (name === "" || email === "" || username === "" || password === "" || country === "" || city === "" || postalCode === "") {
            setAlert('Please fill the fields', 'error')
            e.preventDefault()
        } else {
            e.preventDefault()
            let payload = {
                username,
                name,
                email,
                password,
                country,
                city,
                postal_code: postalCode
            }

            axios.post('https://physiosystem.alcodeit.com/user/addClient', payload).then(res => {
                if (res.data.status === 1) {
                    const body = document.querySelector('#body');
                    body.classList.add('white-body')
                    history.push('/shop')
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("op", res.data.id);
                    localStorage.setItem("el", 3);
                    axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                        setCurrentUser(res.data[0])
                    })
                    setAlert(`${res.data.message}`, 'success')

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

                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Country</label>
                    <input className="fs-16 fw-regular" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">City</label>
                    <input className="fs-16 fw-regular" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="register-form-inputs flex ai-start fd-column">
                    <label className="fs-16 fw-regular" htmlFor="#">Postal Code</label>
                    <input className="fs-16 fw-regular" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>

                <button className="register-form-submit-btn fs-16 fw-regular" >Register</button>
                <div className="register-form-links flex ai-center jc-start">
                    <Link className="fs-14 fw-medium" to="/" >Already a member?</Link>
                </div>
            </form>
        </div>
    )
}
