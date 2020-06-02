import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';
import DirectoryCard from '../components/DirectoryCard';
import DirectoriesContext from '../contexts/DirectoriesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing()}px`
  }
}));

const Directories: React.FC = () => {
  const classes = useStyles();
  const { directoryConfigs } = React.useContext(DirectoriesContext.Context);

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
          {_.map(directoryConfigs, (directoryConfig, i) => (
            <Grid item xs={6} md={4} lg={3} key={i}>
              <DirectoryCard directoryConfig={directoryConfig} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Page>
  );
};

export default Directories;
