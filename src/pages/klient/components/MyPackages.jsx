import React, { useEffect, useContext } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom';

export default function MyPackages() {

    const clientContext = useContext(ClientContext);
    const { getMyPackages, mypackages , expireMyPackage } = clientContext;
    useEffect(() => {
        getMyPackages()
        expireMyPackage()
    }, [])
    if (mypackages.length !== 0) {
        var packages = mypackages.map(item => item.packages[0])
    }
    return (
        <div className="mypackages" >
            <div className="mypackages-header flex ai-center jc-spaceb">
                <p className="mypackages-header-title fs-38 fw-semib">My Packages</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="mypackages-paketat flex ai-start">
                {packages && packages.map(paket => (
                    <div className="mypackages-paketat-item  flex fd-column ai-center">
                        <Link to={`/shop/mypackages/${paket.id}`} className="mypackages-paketat-item-image">
                            <img src={`https://physiosystem.alcodeit.com//files/${paket.photo}`} className="img-res" alt="" />
                        </Link>
                        <p className="mypackages-paketat-item-title fs-22 fw-bold">{paket.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
