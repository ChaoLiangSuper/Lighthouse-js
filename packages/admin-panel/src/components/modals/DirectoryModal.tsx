import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { directoryActionType } from '../../store/actions';
import { Store, DirectoryCollection } from '../../types';

interface DirectoryModalProps {
  open: boolean;
  onClose: () => void;
  saveDirectory: (dictoryName: string) => void;
  directories: DirectoryCollection;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  },
  inputField: {
    '& input': {
      textAlign: 'center'
    }
  }
}));

const DirectoryModal: React.FC<DirectoryModalProps> = ({ open, onClose, saveDirectory, directories }) => {
  const classes = useStyles();
  const [directoryName, setDirectoryName] = useState('');

  useEffect(() => setDirectoryName(''), [open]);

  const validate = () =>
    directoryName !== '' &&
    !_(directories)
      .keys()
      .includes(directoryName);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New directory"
      maxHeight={200}
      buttons={
        <>
          <Button className={classes.button} onClick={onClose}>
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              saveDirectory(directoryName.trim());
              onClose();
            }}
            disabled={!validate()}
          >
            Save
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            placeholder="Type the new directory name"
            autoFocus
            className={classes.inputField}
            value={directoryName}
            onChange={({ target }) => {
              setDirectoryName(target.value);
            }}
            onKeyPress={({ key }) => {
              if (key === 'Enter') {
                if (validate()) {
                  saveDirectory(directoryName.trim());
                  onClose();
                }
              }
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default connect(
  ({ directories }: Store) => ({
    directories
  }),
  (dispatch) => ({
    saveDirectory: (directoryName: string) =>
      dispatch({
        type: directoryActionType.DIRECTORY_ADD,
        data: {
          name: directoryName
        }
      })
  })
)(DirectoryModal);
