import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Paketat from './Paketat'
import Porosit from './Porosit'
import Oferta from './Oferta'
import Klientet from './Klientet'
import Profili from './Profili'
import ShtoPaket from './ShtoPaket'
import ShtoOfert from './ShtoOfert'
import EditOferta from './EditOferta'
import SingleClient from './SingleClient'

export default function FizioBody() {
    return (
        <div className="fizio-body" >
            <Switch>
                <Route exact path="/fizio" component={Paketat} />
                <Route exact path="/fizio/porosit" component={Porosit} />
                <Route exact path="/fizio/oferta" component={Oferta} />
                <Route exact path="/fizio/klientet" component={Klientet} />
                <Route exact path="/fizio/profili" component={Profili} />
                <Route exact path="/fizio/shtopaket" component={ShtoPaket} />
                <Route exact path="/fizio/addoffer" component={ShtoOfert} />
                <Route exact path="/fizio/oferta/:offer_id" component={EditOferta} />
                <Route exact path="/fizio/klientet/:client_id" component={SingleClient} />
            </Switch>
        </div>
    )
}
