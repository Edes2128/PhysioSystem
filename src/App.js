import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Klient from './pages/klient/Klient';
import Fizioterapist from './pages/fizioterapist/Fizioterapist';
import KlientProvider from './context/klient/KlientProvider';
import AlertState from './context/alerts/AlertState';
import Alerts from './components/Alerts';
import Media from './components/Media';
import MediaState from './context/media/MediaState';

function App() {
  // const path = useLocation();
  // useEffect(() => {
  //   const body = document.querySelector('#body');
  //   if (path.pathname !== "/fizio") {
  //     body.classList.add('white-body')
  //   } else {
  //     body.classList.remove('white-body')
  //   }
  // }, [path])

  return (
    <>
      <KlientProvider>
        <MediaState>
          <AlertState>
            <Alerts />
            <Media />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/shop" component={Klient} />
              <Route path="/fizio" component={Fizioterapist} />
            </Switch>
          </AlertState>
        </MediaState>
      </KlientProvider>
    </>
  );
}
export default App;