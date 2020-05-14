import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DirectoryCollection, Store } from '../types';
import Page from '../components/Page';
import DirectoryCard from '../components/DirectoryCard';

interface DashboardProps {
  directories: DirectoryCollection;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing()}px`
  }
}));

const Dashboard: React.FC<DashboardProps> = ({ directories }) => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Directories
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={3}>
            <DirectoryCard isEmpty />
          </Grid>
          {_.map(directories, (directory, i) => (
            <Grid item xs={6} md={4} lg={3} key={i}>
              <DirectoryCard directory={directory} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Page>
  );
};

export default connect(({ directories }: Store) => ({
  directories
}))(Dashboard);
