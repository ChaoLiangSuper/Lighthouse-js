import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

interface FloatingLoadingProps {
  text?: string;
}

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const FloatingLoading: React.FC<FloatingLoadingProps> = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Paper className={classes.paper} elevation={15}>
        <CircularProgress />
        <br />
        {text}
      </Paper>
    </div>
  );
};

export default FloatingLoading;
