import React from 'react';
import MaterialUiModal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface ModalProps {
  onClose: () => void;
  title: string;
  buttons?: React.ReactNode;
  maxHeight?: number;
}

const useStyles = makeStyles<Theme, { maxHeight?: number }>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4,
    width: `calc(100% - ${theme.spacing(20)}px)`,
    maxWidth: 1000,
    // height: `calc(100vh - ${theme.spacing(20)}px)`,
    maxHeight: (props) => props.maxHeight || 700
  },
  titleBar: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1
  },
  editableSection: {
    padding: `${theme.spacing(3)}px 0px`,
    flexGrow: 1
  },
  buttonBar: {
    display: 'flex'
  },
  buttonBarSpacer: {
    marginRight: 'auto'
  }
}));

const Modal: React.FC<ModalProps> = ({ onClose, title, children, buttons, maxHeight }) => {
  const classes = useStyles({ maxHeight });

  return (
    <MaterialUiModal open={true} onClose={onClose} className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.titleBar}>
          <Typography variant="h5" component="span" color="textSecondary" className={classes.title}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.editableSection}>{children}</div>
        <div className={classes.buttonBar}>
          <div className={classes.buttonBarSpacer} />
          {buttons}
        </div>
      </div>
    </MaterialUiModal>
  );
};

export default Modal;
