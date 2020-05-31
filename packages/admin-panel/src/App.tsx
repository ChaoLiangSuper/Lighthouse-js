import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from './router/Router';
import ContextsProvider from './contexts';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <ContextsProvider>
        <div className={classes.root}>
          <Router />
        </div>
      </ContextsProvider>
    </>
  );
};

export default App;
