import React, { useContext } from 'react'
import ClientContext from '../../../context/klient/klientContext'
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import axios from 'axios'

export default function MiniCarItem({ image, title, oferta, new_price, price, package_id }) {
    const clientContext = useContext(ClientContext);
    const { getCart } = clientContext

    return (
        <div className="minicart-item flex ai-center jc-spaceb">
            <div className="minicart-item-image flex">
                <img className="img-res" src={`https://physiosystem.alcodeit.com/files/${image}`} loading='lazy' alt="" />
            </div>
            <div className="minicart-item-texts flex fd-column ai-center">
                <p className="fs-14 fw-regular" >{title}</p>
                {oferta === false ?
                    <p>{price}</p>
                    :
                    <p className="fs-14 fw-light" >{new_price} € <sup><del>{price} €</del></sup> </p>
                }
                
            </div>
            <RemoveCart
                onClick={() => {
                    axios.post('https://physiosystem.alcodeit.com/client/removeCart', { user_id: localStorage.getItem('op'), package_id: package_id }).then(res => {
                        getCart()
                    })
                }}
            />
        </div>
    )
}
