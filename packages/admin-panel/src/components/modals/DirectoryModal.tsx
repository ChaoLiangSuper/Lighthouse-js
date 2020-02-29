import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Record, Column } from '../../types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '../Modal';

interface DirectoryModalProps {
  open: boolean;
  onClose: () => void;
  data: Record | null;
  columns: Column[];
  updateRecordByDirectoryName: (updatedField: Partial<Record>) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  }
}));

const DirectoryModal: React.FC<DirectoryModalProps> = ({
  open,
  onClose,
  data,
  columns,
  updateRecordByDirectoryName
}) => {
  const classes = useStyles();
  const [state, setState] = useState(data);

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Record"
      buttons={
        <>
          <Button className={classes.button} onClick={onClose}>
            Cancel
          </Button>
          <Button
            // disabled={validateState()}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              updateRecordByDirectoryName(state);
              onClose();
            }}
          >
            Save
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label="Key" value={state.key} variant="outlined" fullWidth disabled />
        </Grid>
        {_.map(columns, ({ name }) => (
          <Grid item xs={6} key={name}>
            <TextField
              label={name}
              value={state[name]}
              onChange={({ target }) =>
                setState({
                  ...state,
                  [name]: target.value
                })
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
};

export default DirectoryModal;
