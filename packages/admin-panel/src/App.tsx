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
      <UserContext.Provider>
        <div className={classes.root}>
          <CssBaseline />
          <Router />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default App;
