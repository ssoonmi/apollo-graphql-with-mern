import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './components/session/Login';
import { AuthRoute } from './components/util/RouteUtils';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" component={Login} />
        <Route path="/" render={() => <h1>Unknown Page</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
