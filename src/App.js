import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Klient from './pages/klient/Klient';
import Fizioterapist from './pages/fizioterapist/Fizioterapist';
import KlientProvider from './context/klient/KlientProvider';
import AlertState from './context/alerts/AlertState';
import Alerts from './components/Alerts';

function App() {

  return (
    <>
      <KlientProvider>
        <AlertState>
          <Alerts />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/shop" component={Klient} />
            <Route path="/fizio" component={Fizioterapist} />
          </Switch>
        </AlertState>
      </KlientProvider>
    </>
  );
}
export default App;