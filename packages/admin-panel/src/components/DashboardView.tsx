import _ from 'lodash';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { DirectoryCollection, Store, ViewState } from '../types';

const changeView = (data: ViewState<{}>) => ({ type: 'VIEW_UPDATE', data });

interface DashboardViewProps {
  directories: DirectoryCollection;
  changeView: (v: ViewState<{ key: string }>) => void;
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
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: 200,
    margin: 10
  }
}));

const DashboardView: React.FC<DashboardViewProps> = ({ directories, changeView }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Directories
      </Typography>
      <div className={classes.wrapper}>
        {_.map(directories, (directory, i) => (
          <Card key={i} className={classes.card}>
            <CardActionArea
              className={classes.button}
              onClick={() =>
                changeView({
                  view: 'directory',
                  state: {
                    key: directory.name
                  }
                })
              }
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default connect(
  ({ directories }: Store) => ({
    directories
  }),
  (dispatch) => bindActionCreators({ changeView }, dispatch)
)(DashboardView);
