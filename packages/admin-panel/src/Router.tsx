import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/views/Login';
import Dashboard from './components/views/Dashboard';
import Records from './components/views/Records';
import DirectoryConfig from './components/views/DirectoryConfig';

export type urlParams = {
  directoryName: string;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/directory/:directoryName/records/" component={Records} />
      <Route exact path="/directory/:directoryName/config/" component={DirectoryConfig} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Router;
