import React, { useState, useContext } from 'react'
import axios from 'axios'
import AlertContext from '../context/alerts/AlertContext';
import LoadingContext from '../context/loading/LoadingContext';
import Loading from './Loading';
export default function ForgoPassword() {

    const loadingContext = useContext(LoadingContext)
    const { show, setShow } = loadingContext
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext;
    const [showForm, setShowForm] = useState(false)
    const [showMesage, setShowMesage] = useState(false)
    const [user, setUser] = useState({})
    const [userName, setUsername] = useState('')

    const findUser = () => {

        if (userName === "") {
            setAlert('Please fill the field', 'error')
        } else {
            axios.post('https://physiosystem.alcodeit.com/user/findEmail', { username: userName }).then(res => {
                if (res.data.status === 1) {
                    setUser(res.data)
                    setShowForm(true)
                } else {
                    setAlert(`${res.data.message}`, 'error')
                }
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setShow(true)
        axios.post('https://physiosystem.alcodeit.com/user/sendMail', { email: user.email, link: `https://physiosystem.netlify.app/resetpassword?user_id=${user.id}`, fullname: user.fullname }).then(res => {
            setShowMesage(true)
            setShow(false)
        })

    }
    return (
        <>
            {show && <Loading />}
            <div className='forgot-password flex fd-column' >
                {showForm ?
                    <>
                        {showMesage ? <div className='forgot-password-message flex fd-column ai-center' >
                            <p className='fs-20 fw-regular' >Check your email!</p>
                        </div> :
                            <form onSubmit={onSubmit} className='flex fd-column ai-center' >
                                <p className='fs-20 fw-regular' >Your email is : {user && user.email}</p>
                                <button className='fs-18 fw-regular' type='submit'>Send link</button>
                            </form>
                        }
                    </>
                    :
                    <div className='forgot-password-username flex fd-column ai-center' >
                        <p className='fs-20 fw-regular' >Please insert your username</p>
                        <input type="text" value={userName} placeholder='Username...' className='fs-16 fw-regular' onChange={(e) => setUsername(e.target.value)} />
                        <button onClick={findUser} className='fs-18 fw-regular' >Find your email</button>
                    </div>
                }
            </div>
        </>
    )
}
