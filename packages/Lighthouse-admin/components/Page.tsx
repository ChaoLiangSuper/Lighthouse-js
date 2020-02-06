import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './NavigationBar';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
});

const Page: React.FC = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <NavigationBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Page;
