import React, { useEffect, useContext } from 'react'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom';
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import { ReactComponent as Cart } from '../../../images/cart-2.svg'
import axios from 'axios';

export default function MiniCart() {

    const clientContext = useContext(ClientContext);
    const { cart, getCart } = clientContext

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="minicart flex fd-column ai-start" >
            {cart.length === 0 ?
                <p>Cart is empty!</p>
                :
                <>
                    {cart.map(item => (
                        <div className="minicart-item flex ai-center jc-spaceb">
                            <div className="minicart-item-image flex">
                                <img className="img-res" src={`https://physiosystem.alcodeit.com/files/${item.package.photo}`} alt="" />
                            </div>
                            <div className="minicart-item-texts flex fd-column ai-center">
                                <p className="fs-14 fw-regular" >{item.package.name}</p>
                                {item.oferta === false ?
                                    <p>{item.package.price}</p>
                                    :
                                    <p className="fs-14 fw-light" >{item.oferta.new_price} € <sup><del>{item.package.price} €</del></sup> </p>
                                }
                            </div>
                            <RemoveCart
                                onClick={() => {
                                    axios.post('https://physiosystem.alcodeit.com/client/removeCart', { user_id: localStorage.getItem('op'), package_id: item.package.id }).then(res => {
                                        getCart()
                                    })
                                }}
                            />

                        </div>
                    ))}
                    <div className="minicart-link flex jc-center ai-center">
                        <Cart />
                        <Link to="/shop/cart" >View Cart</Link>
                    </div>

                </>
            }
        </div>
    )
}
