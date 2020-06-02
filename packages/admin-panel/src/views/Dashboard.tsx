import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing()}px`
  }
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Dashboard
        </Typography>
      </div>
    </Page>
  );
};

export default Dashboard;
