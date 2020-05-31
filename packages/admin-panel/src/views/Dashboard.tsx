import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';
import DirectoryCard from '../components/DirectoryCard';
import DirectoriesContext from '../contexts/DirectoriesContext';
import * as directoryApi from '../api/directory';

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
  const { directories, initConfigs } = React.useContext(DirectoriesContext.Context);

  React.useEffect(() => {
    (async () => {
      const configs = await directoryApi.getAllConfigs();
      initConfigs(configs);
    })();
  }, []);

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

export default Dashboard;
