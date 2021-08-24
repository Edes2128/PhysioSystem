import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Klient from './pages/klient/Klient';
import Fizioterapist from './pages/fizioterapist/Fizioterapist';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/klient" component={Klient} />
        <Route path="/fizio" component={Fizioterapist} />
      </Switch>
    </>
  );
}
export default App;