import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Record } from '../../types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

interface DirectoryModalProps {
  open: boolean;
  onClose: () => void;
  data: Record | null;
}

const useState = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4,
    width: `calc(100vw - ${theme.spacing(20)}px)`,
    height: `calc(100vh - ${theme.spacing(20)}px)`
  },
  titleBar: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1
  },
  config: {}
}));

const DirectoryModal: React.FC<DirectoryModalProps> = ({ open, onClose, data }) => {
  const classes = useState();

  if (data === null) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.titleBar}>
          <Typography variant="h5" component="span" color="textSecondary" className={classes.title}>
            Key: {data.key}
          </Typography>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </div>
        <div className={classes.config}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField />
            </Grid>
            <Grid item xs={4}>
              <TextField />
            </Grid>
            <Grid item xs={4}>
              <TextField />
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};

export default DirectoryModal;
