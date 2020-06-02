import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';

const Login = lazy(() => import('../views/Login'));
const Directories = lazy(() => import('../views/Directories'));
const Records = lazy(() => import('../views/Records'));
const DirectoryConfig = lazy(() => import('../views/DirectoryConfig'));

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <PrivateRoute login={Login}>
        <Switch>
          <Route exact path="/directory/:directoryName/records/" component={Records} />
          <Route exact path="/directory/:directoryName/config/" component={DirectoryConfig} />
          <Route exact path="/directory/" component={Directories} />
          <Route path="/" component={Directories} />
        </Switch>
      </PrivateRoute>
    </Suspense>
  </BrowserRouter>
);

export default Router;
