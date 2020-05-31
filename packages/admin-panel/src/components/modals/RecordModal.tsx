import _ from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Record, UrlParams } from '../../types/types';
import Modal from '../Modal';
import DirectoriesContext from '../../contexts/DirectoriesContext';
import RecordsContext from '../../contexts/RecordsContext';

interface RecordModalProps {
  open: boolean;
  onClose: () => void;
  recordKey: string | null;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  }
}));

const RecordModal: React.FC<RecordModalProps> = ({ open, onClose, recordKey }) => {
  const classes = useStyles();
  const { directoryName } = useParams<UrlParams>();
  const { directories, updateNumOfRecord } = React.useContext(DirectoriesContext.Context);
  const { records, updateRecord } = React.useContext(RecordsContext.Context);
  const { columns, numOfRecords } = directories[directoryName];
  const record: Record = recordKey ? records[directoryName][recordKey] : { key: _.uniqueId('new-record-') };
  const [state, setState] = React.useState(record);

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
              updateRecord(directoryName, state);
              if (recordKey === null) updateNumOfRecord(directoryName, numOfRecords + 1);
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

export default RecordModal;
