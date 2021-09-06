import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Shop from './Shop'
import MyPackages from './MyPackages'
import Orders from './Orders'
import Wishlist from './Wishlist'
import Cart from './Cart'
import Profile from './Profile'

export default function Body() {
    return (
        <>
        <div className="klient-body" >
            <Switch>
                <Route exact path="/shop" component={Shop} />
                <Route path="/shop/mypackages" component={MyPackages} />
                <Route path="/shop/orders" component={Orders} />
                <Route path="/shop/wishlist" component={Wishlist} />
                <Route paht="/shop/cart" component={Cart} />
                <Route path="/shop/profile" component={Profile} />
            </Switch>
            </div>
        </>
    )
}
