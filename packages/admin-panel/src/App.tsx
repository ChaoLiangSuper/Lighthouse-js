import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from './router/Router';
import ContextsProvider from './contexts';
import StatusFeedback from './components/StatusFeedback';

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
          <StatusFeedback />
        </div>
      </ContextsProvider>
    </>
  );
};

export default App;
