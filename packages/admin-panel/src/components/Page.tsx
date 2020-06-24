import React from 'react';
import Navigation from './Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

interface PageProps {
  showNavigation?: boolean;
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  navigationSpacer: theme.mixins.toolbar
}));

const Page: React.FC<PageProps> = ({ children, showNavigation = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      {showNavigation ? (
        <>
          <Navigation />
          <div className={classes.navigationSpacer} />
        </>
      ) : null}
      {children}
      <Copyright />
    </div>
  );
};

export default Page;
