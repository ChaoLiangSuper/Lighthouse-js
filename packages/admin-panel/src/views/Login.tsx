import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { AppName } from '../constant';
import LoginPanel from '../components/LoginPanel';
import Page from '../components/Page';

const useStyles = makeStyles({
  loginBackground: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <Page showNavigation={false}>
      <Helmet>
        <title>Login - {AppName}</title>
      </Helmet>
      <main className={classes.loginBackground}>
        <LoginPanel />
      </main>
    </Page>
  );
};

export default Login;
