import React, { useEffect, useContext } from 'react'
import ClientContext from '../../../context/klient/klientContext'
import { Link } from 'react-router-dom';
import { ReactComponent as CartWhite } from '../../../images/cart-2-white.svg'
import { ReactComponent as RemoveCart } from '../../../images/remove-cart.svg'
import MiniCarItem from './MiniCarItem';
import LoadingContext from '../../../context/loading/LoadingContext';
export default function MiniCart() {

    const clientContext = useContext(ClientContext);
    const { cart, getCart } = clientContext

    const loadingContext = useContext(LoadingContext)
    const { showMinicart } = loadingContext
    useEffect(() => {
        getCart()
    }, [])

    return (
        <>
            <div onClick={() => showMinicart(false)} className={"opa show-opa"} ></div>
            <div className="minicart flex fd-column ai-start" >
                <div className="minicart-top flex ai-center jc-spaceb">
                    <p>Cart Details</p>
                    <RemoveCart
                        onClick={() => showMinicart(false)}
                        style={{ width: '30px', cursor: 'pointer' }}
                    />
                </div>
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

                            <Link
                                onClick={() => showMinicart(false)}
                                to="/shop/cart"
                                className='flex ai-center'
                            >
                                <CartWhite
                                    style={{ marginRight: '10px' }}
                                />
                                Check Out
                            </Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
