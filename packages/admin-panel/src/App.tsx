import React from 'react';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from './router';
import store from './store';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
});

const App: React.FC = () => {
  const styles = useStyles();
  return (
    <Provider store={store}>
      <div className={styles.root}>
        <CssBaseline />
        <Router />
      </div>
    </Provider>
  );
};

export default App;
