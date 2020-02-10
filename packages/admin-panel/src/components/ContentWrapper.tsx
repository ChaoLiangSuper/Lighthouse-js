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
  const styles = useStyles();
  return (
    <div className={styles.content}>
      <div className={styles.navigationSpacer} />
      {children}
    </div>
  );
};

export default ContentWrapper;
