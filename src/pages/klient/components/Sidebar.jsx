import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Bag } from '../../../images/bag.svg'
import { ReactComponent as Box } from '../../../images/box.svg'
import { ReactComponent as ShoppingList } from '../../../images/shopping-list.svg';
import { ReactComponent as Like } from '../../../images/like.svg'
import { ReactComponent as Cart } from '../../../images/cart.svg'
import { ReactComponent as Profile } from '../../../images/profile.svg'
import { ReactComponent as Logout } from '../../../images/logout.svg'
export default function Sidebar() {
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
        <div className="kient-sidebar flex fd-column ai-center jc-spaceb" >
            <div className="kient-sidebar-top flex fd-column ai-center">
                <div className="kient-sidebar-top-logo flex">
                    <img src="/images/care-logo.png" className="img-res" alt="" />
                </div>
                <ul className="kient-sidebar-top-links">
                    {links.map(link => (
                        <li className={link.active ? "kient-sidebar-top-links-item  link-active flex ai-center" : "kient-sidebar-top-links-item flex ai-center"} >
                            {link.icon}
                            <Link to={link.path} className="kient-sidebar-top-links-item-link fs-16 fw-medium" >{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="kient-sidebar-bottom flex jc-center ai-center">
                <Logout /> <p className="fs-18 fw-regular" >Logout</p>
            </div>
        </div>
    )
}