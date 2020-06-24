import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';

const Login = lazy(() => import('../views/Login'));
const DirectoryView = lazy(() => import('../views/Directory.view'));
const RecordDatasetView = lazy(() => import('../views/RecordDataset.view'));
const DirectoryConfigView = lazy(() => import('../views/DirectoryConfig.view'));

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <PrivateRoute login={Login}>
        <Switch>
          <Route exact path="/directory/:currentDirectoryName/records/" component={RecordDatasetView} />
          <Route exact path="/directory/:currentDirectoryName/config/" component={DirectoryConfigView} />
          <Route exact path="/directory/" component={DirectoryView} />
          <Route path="/" component={DirectoryView} />
        </Switch>
      </PrivateRoute>
    </Suspense>
  </BrowserRouter>
);

export default Router;
