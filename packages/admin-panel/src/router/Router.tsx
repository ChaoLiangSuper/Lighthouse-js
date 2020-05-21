import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';

const Login = lazy(() => import('../views/Login'));
const Dashboard = lazy(() => import('../views/Dashboard'));
const Records = lazy(() => import('../views/Records'));
const DirectoryConfig = lazy(() => import('../views/DirectoryConfig'));

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PrivateRoute login={Login}>
          <Route exact path="/directory/:directoryName/records/" component={Records} />
          <Route exact path="/directory/:directoryName/config/" component={DirectoryConfig} />
          <Route path="/" component={Dashboard} />
        </PrivateRoute>
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
