import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from '../../graphql/queries';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({
  component: Component,
  path,
  exact,
  redirectTo
}) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (!redirectTo) redirectTo = "/";

  if (loading || error || !data) {
    return null;
  } else if (!data.isLoggedIn) {
    return <Route path={path} component={Component} exact={exact} />;
  } else {
    return <Redirect to={redirectTo} />;
  }
};

export const ProtectedRoute = ({
  component: Component,
  path,
  exact,
  redirectTo
}) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (!redirectTo) redirectTo = "/login";

  if (loading || error || !data) {
    return null;
  } else if (data.isLoggedIn) {
    return <Route path={path} component={Component} exact={exact} />;
  } else {
    return <Redirect to={redirectTo} />;
  }
};