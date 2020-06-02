import _ from 'lodash';
import React from 'react';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import StatusContext from '../contexts/StatusContext';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'fixed',
    lef: 0,
    bottom: 0
  },
  feedback: {
    '& + &': {
      marginTop: theme.spacing()
    },
    position: 'relative'
  }
}));

const StatusFeedback = () => {
  const classes = useStyles();
  const { statusList, removeStatus } = React.useContext(StatusContext.Context);

  const handleClose = (id: string) => (_event: unknown, reason: SnackbarCloseReason) => {
    if (reason !== 'clickaway') removeStatus(id);
  };

  return (
    <div className={classes.wrapper}>
      {_.map(statusList, (status) => (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={true}
          autoHideDuration={6000}
          onClose={handleClose(status.id)}
          key={status.id}
          className={classes.feedback}
        >
          <Alert severity={status.type} variant="filled">
            {status.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default StatusFeedback;
