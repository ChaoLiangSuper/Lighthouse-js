import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import DashboardView from '../components/DashboardView';
import DirectoryView from '../components/DirectoryView';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/directory/:directoryName" component={DirectoryView} />
      <Route path="/" component={DashboardView} />
    </Switch>
  </BrowserRouter>
);

export default Router;
