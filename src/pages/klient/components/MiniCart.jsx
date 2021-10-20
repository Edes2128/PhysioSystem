import React, { useEffect, useContext } from 'react'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom';
import { ReactComponent as CartWhite } from '../../../images/cart-2-white.svg'
import MiniCarItem from './MiniCarItem';
export default function MiniCart() {

    const clientContext = useContext(ClientContext);
    const { cart, getCart } = clientContext

    useEffect(() => {
        getCart()
    }, [])

    return (
        <>
            <div className={"opa show-opa"} ></div>
            <div className="minicart flex fd-column ai-start" >
                {cart.length === 0 ?
                    <p>Cart is empty!</p>
                    :
                    <>
                        {cart.map(item => (
                            <MiniCarItem
                                image={item.package.photo}
                                title={item.package.name}
                                key={item.package.id}
                                package_id={item.package.id}
                                new_price={item.oferta.new_price}
                                price={item.package.price}
                                oferta={item.oferta}
                            />
                        ))}
                        <div className="minicart-link flex jc-center ai-center">
                            <CartWhite />
                            <Link to="/shop/cart" >View Cart</Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
