import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

interface PrivateRouteProps {
  login: RouteProps['component'];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, login }) => {
  const { user } = React.useContext(UserContext.Context);

  if (user) {
    return <>{children}</>;
  }

  return <Route path="*" component={login} />;
};

export default PrivateRoute;
