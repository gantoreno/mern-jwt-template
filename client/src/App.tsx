import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { ConditionalRoute } from './components/conditional/ConditionalRoute';
import { GetAuthState } from './components/auth/GetAuthState';
import './App.sass';

export const AppRouter: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <GetAuthState>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <ConditionalRoute
            path="/login"
            fallbackTo="/"
            enabledIf={!user}
            component={Login}
            exact
          />
          <ConditionalRoute
            path="/register"
            fallbackTo="/"
            enabledIf={!user}
            component={Register}
            exact
          />
        </Switch>
      </BrowserRouter>
    </GetAuthState>
  );
};
