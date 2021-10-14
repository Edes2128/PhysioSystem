import React, { useContext, useState } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import AlertContext from '../context/alerts/AlertContext';
import ClientContext from '../context/klient/klientContext'

export default function ResetPassword({ history }) {
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext
    const clientContext = useContext(ClientContext);
    const { setCurrentUser } = clientContext;
    const location = useLocation()
    const user_id = queryString.parse(location.search)
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    var body = document.querySelector('#body');
    const onReset = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            axios.post('https://physiosystem.alcodeit.com/user/resetPassword', { user_id: user_id.user_id, password }).then(res => {
                if (res.data.status === 1 && res.data.role === 3) {
                    history.push('/shop')
                    setAlert(`${res.data.message}`, 'success')
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("op", res.data.id);
                    axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                        setCurrentUser(res.data[0])
                    })
                    localStorage.setItem("el", res.data.role);
                    body.classList.add('white-body')
                } else if (res.data.status === 1 && res.data.role === 2) {
                    body.classList.remove('white-body')
                    history.push('/fizio')
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("op", res.data.id);
                    localStorage.setItem("el", res.data.role);
                    axios.post('https://physiosystem.alcodeit.com/user/getCurrentUser', { token: JSON.parse(localStorage.getItem('token')) }).then(res => {
                        setCurrentUser(res.data[0])
                    })
                    setAlert(`${res.data.message}`, 'success')
                }

            })
        } else {
            setAlert('Passwords are not the same', 'error')
        }
    }

    return (
        <div className='reset-password' >
            <form className='reset-password-form flex fd-column ai-start' onSubmit={onReset}>
                <div className="reset-password-form-input flex fd-column ai-start">
                    <label htmlFor="#" className='fs-18 fw-regular' >New Password</label>
                    <input className='fs-18 fw-regular' type={showPassword ? "text" : 'password'} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="reset-password-form-input flex fd-column ai-start">
                    <label htmlFor="#" className='fs-18 fw-regular' >Confirm new password</label>
                    <input className='fs-18 fw-regular' type={showPassword ? "text" : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='reset-password-show flex ai-center' >
                    <p>Show password</p>
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                </div>
                <button type='submit' className='fs-18 fw-regular' >Save Password</button>
            </form>
        </div>
    )
}
