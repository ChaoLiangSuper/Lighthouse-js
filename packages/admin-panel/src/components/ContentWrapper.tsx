import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const ContentWrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.navigationSpacer} />
      {children}
    </div>
  );
};

export default ContentWrapper;
