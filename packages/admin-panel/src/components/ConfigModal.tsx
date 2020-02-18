import _ from 'lodash';
import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Directory } from '../types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import { fieldTypes } from '../config';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  data: Directory;
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
  schemaSection: {
    padding: theme.spacing(3)
  },
  schemaField: {
    padding: `${theme.spacing(1)}px 0`
  },
  textField: {
    width: '100%'
  }
}));

const ConfigModal: React.FC<ConfigModalProps> = ({ open, onClose, data }) => {
  const classes = useState();

  if (data === null) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.titleBar}>
          <Typography variant="h5" component="span" color="textSecondary" className={classes.title}>
            {data.name}
          </Typography>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </div>
        <div className={classes.schemaSection}>
          {_.map(data.schema, (field) => {
            if (field.name === 'key') {
              return null;
            }
            return (
              <Grid container spacing={3} className={classes.schemaField}>
                <Grid item xs={3}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={field.name}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    select
                    label="Type"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={field.type}
                  >
                    {_.map(fieldTypes, (type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Default Value"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    // value={field.name}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={field.isOptional}
                        value="isOptional"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                    label="This field is optional"
                  />
                </Grid>
              </Grid>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ConfigModal;
