import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Bag } from '../../../images/bag.svg'
import { ReactComponent as Box } from '../../../images/box.svg'
import { ReactComponent as ShoppingList } from '../../../images/shopping-list.svg';
import { ReactComponent as Like } from '../../../images/like.svg'
import { ReactComponent as Cart } from '../../../images/cart.svg'
import { ReactComponent as Profile } from '../../../images/profile.svg'
import { ReactComponent as Logout } from '../../../images/logout.svg'
import LoadingContext from '../../../context/loading/LoadingContext';


export default function Sidebar({ logout }) {

    const collapseContext = useContext(LoadingContext)
    const { setCollapse, collapse } = collapseContext
    const path = useLocation();
    const links = [
        {
            path: '/shop',
            icon: <Bag />,
            text: 'Shop',
            active: path.pathname === "/shop" ? true : false
        },
        {
            path: '/shop/mypackages',
            icon: <Box />,
            text: 'My Packages',
            active: path.pathname === "/shop/mypackages" ? true : false
        },
        {
            path: '/shop/orders',
            icon: <ShoppingList />,
            text: 'Orders',
            active: path.pathname === "/shop/orders" ? true : false
        },
        {
            path: '/shop/wishlist',
            icon: <Like />,
            text: 'Wishlist',
            active: path.pathname === "/shop/wishlist" ? true : false
        },
        {
            path: '/shop/cart',
            icon: <Cart />,
            text: 'Cart',
            active: path.pathname === "/shop/cart" ? true : false
        },
        {
            path: '/shop/profile',
            icon: <Profile />,
            text: 'Profile',
            active: path.pathname === "/shop/profile" ? true : false
        }
    ]
    return (
        <>
            <div onClick={() => setCollapse(false)} className={collapse ? "opa show-opa" : "opa"} ></div>
            <div className={collapse ? "kient-sidebar show-klient-sidebar flex fd-column ai-center jc-spaceb" : "kient-sidebar flex fd-column ai-center jc-spaceb"}  >
                <div className="kient-sidebar-top flex fd-column ai-center">
                    <div className="kient-sidebar-top-logo flex">
                        <img src="/images/care-logo.png" className="img-res" alt="" />
                    </div>
                    <ul className="kient-sidebar-top-links">
                        {links.map(link => (
                            <li key={link.path} className={link.active ? "kient-sidebar-top-links-item  link-active flex ai-center" : "kient-sidebar-top-links-item flex ai-center"} >
                                {link.icon}
                                <Link onClick={() => setCollapse(false)} to={link.path} className="kient-sidebar-top-links-item-link fs-16 fw-medium" >{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="kient-sidebar-bottom flex jc-center ai-center">
                    <Logout onClick={logout} /> <p className="fs-18 fw-regular" onClick={logout} >Logout</p>
                </div>
            </div>
        </>
    )
}