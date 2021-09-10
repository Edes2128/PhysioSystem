import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Shop from './Shop'
import MyPackages from './MyPackages'
import Orders from './Orders'
import Wishlist from './Wishlist'
import Cart from './Cart'
import Profile from './Profile'
import SinglePackage from './SinglePackage'
import SingleBought from './SingleBought'
import SingleDay from './SingleDay'

export default function Body() {
    return (
        <div className="klient-body" >
            <Switch>
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/shop/mypackages" component={MyPackages} />
                <Route exact path="/shop/orders" component={Orders} />
                <Route exact path="/shop/wishlist" component={Wishlist} />
                <Route exact path="/shop/profile" component={Profile} />
                <Route exact path="/shop/cart" component={Cart} />
                <Route exact path="/shop/:id" component={SinglePackage} />
                <Route exact path="/shop/mypackages/:id" component={SingleBought} />
                <Route exact path="/shop/mypackages/:id/days/:dayid" component={SingleDay} />
            </Switch>
        </div>
    )
}
