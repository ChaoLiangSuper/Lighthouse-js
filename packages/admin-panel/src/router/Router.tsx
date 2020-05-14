import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Login = lazy(() => import('../views/Login'));
const Dashboard = lazy(() => import('../views/Dashboard'));
const Records = lazy(() => import('../views/Records'));
const DirectoryConfig = lazy(() => import('../views/DirectoryConfig'));

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/directory/:directoryName/records/" component={Records} />
        <Route exact path="/directory/:directoryName/config/" component={DirectoryConfig} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
