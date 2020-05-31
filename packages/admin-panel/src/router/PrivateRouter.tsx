import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

interface PrivateRouteProps {
  login: RouteProps['component'];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, login }) => {
  const { user } = React.useContext(UserContext.Context);

  if (user) {
    return <>{children}</>;
  }

  return (
    <>
      <Route exact path="/login" component={login} />
      <Redirect to="/login" />
    </>
  );
};

export default PrivateRoute;
