import React from 'react';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from './router/Router';
import store from './store';
import UserContext from './contexts/UserContext';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <CssBaseline />
      <UserContext.State>
        <div className={classes.root}>
          <Router />
        </div>
      </UserContext.State>
    </Provider>
  );
};

export default App;
