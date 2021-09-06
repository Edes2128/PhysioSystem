import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Klient from './pages/klient/Klient';
import Fizioterapist from './pages/fizioterapist/Fizioterapist';

function App() {
  const path = useLocation();
  useEffect(() => {
    const body = document.querySelector('#body');
    if (path.pathname !== "/fizio") {
      body.classList.add('white-body')
    } else {
      body.classList.remove('white-body')
    }
  }, [path])

  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/shop" component={Klient} />
        <Route path="/fizio" component={Fizioterapist} />
      </Switch>
    </>
  );
}
export default App;