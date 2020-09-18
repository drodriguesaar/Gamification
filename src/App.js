import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Carregando from './components/CarregandoAplicacaoComponent';
import AppNegado from './components/AppNaoAutorizadoComponent';
import Login from './components/LoginComponent';
import Home from './components/HomeComponent';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/h" component={Home}/>
        <Route path="/l" component={Login} />
        <Route path="/n" component={AppNegado} />
        <Route path="/" component={Carregando} />
      </Switch>
    </Router>
  </div>
);

export default App;
