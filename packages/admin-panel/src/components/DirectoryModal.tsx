import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Record } from '../types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface DirectoryModal {
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
  }
}));

const DirectoryModal: React.FC<DirectoryModal> = ({ open, onClose, data }) => {
  const classes = useState();

  if (data === null) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.titleBar}>
          <Typography variant="h5" component="span" color="textSecondary" className={classes.title}>
            {data.key}
          </Typography>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
};

export default DirectoryModal;
