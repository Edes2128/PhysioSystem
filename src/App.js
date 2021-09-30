import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Klient from './pages/klient/Klient';
import Fizioterapist from './pages/fizioterapist/Fizioterapist';
import KlientProvider from './context/klient/KlientProvider';
import AlertState from './context/alerts/AlertState';
import Alerts from './components/Alerts';
import Media from './components/Media';
import MediaState from './context/media/MediaState';
import FizioState from './context/fizioterapist/FizioState'
import LoadingState from './context/loading/LoadingState'
import Loading from './components/Loading';

function App() {
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('el'))
    const body = document.querySelector('#body')
    if (role === 3) {
      body.classList.add('white-body')
    } else {
      body.classList.remove('white-body')
    }
  }, [])

  return (
    <>
      <FizioState>
        <KlientProvider>
          <MediaState>
            <AlertState>
              <LoadingState>
                <Alerts />
                <Media />
                <Loading />
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/shop" component={Klient} />
                  <Route path="/fizio" component={Fizioterapist} />
                </Switch>
              </LoadingState>
            </AlertState>
          </MediaState>
        </KlientProvider>
      </FizioState>
    </>
  );
}
export default App;