import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AlertContext from '../../../context/alerts/AlertContext'

export default function SingleClient({ match }) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext

    useEffect(() => {
        axios.post('https://physiosystem.alcodeit.com//user/getSingleClient', { id: match.params.client_id }).then(res => {
            setUser(res.data)
        })
    }, [match.params.client_id])


    return (
        <div className="singleclient flex fd-column ai-start" >
            <div className="singleclient-links flex ai-center">
                <Link className="fs-30 fw-semib" to="/fizio/klientet" >Klientet</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="1" height="29.501" viewBox="0 0 1 29.501">
                    <line id="Line_6" data-name="Line 6" y2="29.501" transform="translate(0.5)" fill="none" stroke="#707070" stroke-width="1" />
                </svg>
                <p className="fs-20 fw-regular" >{user.name}</p>
            </div>
            <div className="singleclient-actions flex ai-center jc-spaceb ">
                <div className="singleclient-actions-pass flex fd-column ai-start">
                    <input className="fs-18 fw-regular" onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password..." />
                    <button className="fs-18 fw-regular"
                        onClick={() => {
                            axios.post('https://physiosystem.alcodeit.com//user/changeUserPass', { id: match.params.client_id, password }).then(res => {
                                if (res.data.status === 1) {
                                    setPassword('')
                                    setAlert(`${res.data.message}`, 'success')
                                } else {
                                    setAlert(`${res.data.message}`, 'error')
                                }
                            })
                        }}
                    >Ndrysho Password</button>
                </div>
                {user.status === 0 &&
                    <div className="singleclient-actions-status flex fd-column ai-center">
                        <p className="singleclient-actions-status-titulli fs-20 fw-regular">
                            Aktivizo userin?
                        </p>
                        <div className="singleclient-actions-status-buttons">
                            <button className="fs-18 fw-regular" onClick={() => {
                                axios.post('https://physiosystem.alcodeit.com//user/activateClient', { id: match.params.client_id }).then(res => {
                                    if (res.data.status === 1) {
                                        axios.post('https://physiosystem.alcodeit.com//user/getSingleClient', { id: match.params.client_id }).then(res => {
                                            setUser(res.data)
                                        })
                                        setAlert(`${res.data.message}`, 'success')
                                    } else {
                                        setAlert(`${res.data.message}`, 'error')
                                    }
                                })
                            }} >Po</button>
                            <Link className="fs-18 fw-regular" to="/fizio/klientet" >Jo</Link>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
