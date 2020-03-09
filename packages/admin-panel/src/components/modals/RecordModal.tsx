import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { urlParams } from '../../Router';
import { RecordCollection, Store, Record, DirectoryCollection } from '../../types';
import { recordActionType, directoryActionType } from '../../store/actions';
import Modal from '../Modal';

interface RecordModalProps {
  open: boolean;
  onClose: () => void;
  directories: DirectoryCollection;
  recordCollection: RecordCollection;
  recordKey: string | null;
  updateRecord: (directoryName: string) => (updatedField: Record) => void;
  updateNumOfRecord: (directoryName: string) => (numOfRecord: number) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  }
}));

const RecordModal: React.FC<RecordModalProps> = ({
  open,
  onClose,
  directories,
  recordCollection,
  recordKey,
  updateRecord,
  updateNumOfRecord
}) => {
  const classes = useStyles();
  const { directoryName } = useParams<urlParams>();
  const { columns, numOfRecords } = directories[directoryName];
  const record: Record = recordKey ? recordCollection[directoryName][recordKey] : { key: _.uniqueId('new-record-') };
  const [state, setState] = useState(record);

  useEffect(() => {
    setState(record);
  }, [record]);

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
            disabled={_.isEqual(record, state)}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              updateRecord(directoryName)(state);
              if (recordKey === null) updateNumOfRecord(directoryName)(numOfRecords + 1);
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
          <TextField label="Key" value={recordKey ? recordKey : 'new-record'} variant="outlined" fullWidth disabled />
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

export default connect(
  ({ recordCollection, directories }: Store) => ({
    recordCollection,
    directories
  }),
  (dispatch) => ({
    updateRecord: (directoryName: string) => (updatedField: Record) =>
      dispatch({
        type: recordActionType.RECORD_UPDATE,
        data: {
          directoryName,
          updatedField
        }
      }),
    updateNumOfRecord: (directoryName: string) => (numOfRecord: number) =>
      dispatch({
        type: directoryActionType.DIRECTORY_RECORD_NUMBER_UPDATE,
        data: {
          name: directoryName,
          numOfRecord
        }
      })
  })
)(RecordModal);
