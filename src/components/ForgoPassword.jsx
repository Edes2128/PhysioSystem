import React, { useRef, useState, useContext } from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios'
import AlertContext from '../context/alerts/AlertContext';
import LoadingContext from '../context/loading/LoadingContext';
import Loading from './Loading';
export default function ForgoPassword() {

    const loadingContext = useContext(LoadingContext)
    const { show, setShow } = loadingContext
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext;
    const form = useRef()
    const service_id = 'service_7p4zwu2'
    const template_id = 'template_nckhaug'
    const user_id = 'user_wFM4BRSbqWS35PxOiUTq7'
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
        emailjs.sendForm(service_id, template_id, form.current, user_id).then(res => {
            console.log(res)
            if (res.status === 200) {
                setShow(false)
                setShowMesage(true)
            }
        }, (error) => {
            console.log(error)
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
                            <form ref={form} onSubmit={onSubmit} className='flex fd-column ai-center' >
                                <input type="text" hidden value={user && user.fullname} name='fullname' />
                                <input type="text" hidden value={user && `https://localhost:3000/resetpassword?user_id=${user.id}`} name='link' />
                                <input type="text" hidden value={user && user.email} name='email' />
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
