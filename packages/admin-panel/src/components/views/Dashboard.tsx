import _ from 'lodash';
import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { grey } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DirectoryCollection, Store } from '../../types';
import Page from '../Page';

interface DashboardProps {
  directories: DirectoryCollection;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing()}px`
  },
  button: {
    height: 200
  },
  newButton: {
    textAlign: 'center'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: 200,
    margin: 10
  }
}));

const Dashboard: React.FC<DashboardProps> = ({ directories }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page>
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Directories
        </Typography>
        <div className={classes.wrapper}>
          <Card className={classes.card}>
            <CardActionArea className={clsx(classes.button, classes.newButton)}>
              <AddCircleOutlineIcon style={{ fontSize: 60, color: grey[400] }} />
            </CardActionArea>
          </Card>
          {_.map(directories, (directory, i) => (
            <Card key={i} className={classes.card}>
              <CardActionArea
                className={classes.button}
                onClick={() => history.push(`/directory/${encodeURIComponent(directory.name)}`)}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {directory.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`${directory.numOfRecords} records`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default connect(({ directories }: Store) => ({
  directories
}))(Dashboard);
