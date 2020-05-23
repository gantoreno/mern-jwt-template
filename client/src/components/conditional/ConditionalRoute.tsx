import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  enabledIf: any;
  fallbackTo: string;
}

export const ConditionalRoute: React.FC<ProtectedRouteProps> = ({
  enabledIf,
  fallbackTo,
  ...rest
}) => {
  if (enabledIf) {
    return <Route {...rest} />;
  }

  return <Redirect to={fallbackTo} />;
};
