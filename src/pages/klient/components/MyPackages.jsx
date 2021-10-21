import React, { useEffect, useContext, useState } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom';

export default function MyPackages() {

    const clientContext = useContext(ClientContext);
    const { getMyPackages, mypackages, expireMyPackage } = clientContext;
    const [search, setSearch] = useState('')
    useEffect(() => {
        getMyPackages()
        expireMyPackage()
    }, [])


    return (
        <div className="mypackages" >
            <div className="mypackages-header flex ai-center jc-spaceb">
                <p className="mypackages-header-title fs-38 fw-semib">My Packages</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {mypackages && mypackages.length !== 0 ?
                <div className="mypackages-paketat ">
                    {mypackages && mypackages.map(paket => (
                        <div className="mypackages-paketat-item  flex fd-column ai-center">
                            <Link to={`/shop/mypackages/${paket.id}`} className="mypackages-paketat-item-image">
                                <img src={`https://physiosystem.alcodeit.com/files/${paket.photo}`} loading='lazy' className="img-res" alt="" />
                            </Link>
                            <div className="mypackages-paketat-item-bottom flex fd-column ai-start">
                                <div style={{ width: '100%' }} className='flex ai-center jc-spaceb' >
                                    <p className="mypackages-paketat-item-title fs-22 fw-medium">{paket.name}</p>
                                    <p className='fs-18 fw-regular' > - {paket.days_left} days left </p>
                                </div>
                                <p className='fs-18 fw-regular' style={{ marginTop: '15px' }} > 
                                {paket.days.filter(item => item.day_status === "1").length} /{paket.days.length} days completed 
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className='mypackages-empty flex fd-column ai-start'>
                    <p className='fs-28 fw-medium' >You have no packages!</p>
                    <Link to='/shop' className='fs-16 fw-regular'  >Buy Package</Link>
                </div>
            }
        </div>
    )
}
