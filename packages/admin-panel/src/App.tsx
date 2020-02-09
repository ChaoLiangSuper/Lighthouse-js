import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ContentWrapper from './components/ContentWrapper';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Copyright from './components/Copyright';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
});

const App: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <CssBaseline />
      <Navigation />
      <ContentWrapper>
        <Copyright />
      </ContentWrapper>
    </div>
  );
};

export default App;
