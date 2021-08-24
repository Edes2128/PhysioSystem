import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Paketat from './Paketat'
import Porosit from './Porosit'
import Oferta from './Oferta'
import Klientet from './Klientet'
import Profili from './Profili'
import ShtoPaket from './ShtoPaket'

export default function FizioBody() {
    return (
        <div className="fizio-body" >
            <Switch>
                <Route exact path="/fizio" component={Paketat} />
                <Route path="/fizio/porosit" component={Porosit} />
                <Route path="/fizio/oferta" component={Oferta} />
                <Route path="/fizio/klientet" component={Klientet} />
                <Route path="/fizio/profili" component={Profili} />
                <Route path="/fizio/shtopaket" component={ShtoPaket} />
            </Switch>
        </div>
    )
}
