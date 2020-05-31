import _ from 'lodash';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '../Modal';
import DirectoriesContext from '../../contexts/DirectoriesContext';

interface DirectoryModalProps {
  open: boolean;
  onClose: () => void;
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

const DirectoryModal: React.FC<DirectoryModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const [directoryName, setDirectoryName] = React.useState('');
  const { directories, appDirectory } = React.useContext(DirectoriesContext.Context);

  React.useEffect(() => setDirectoryName(''), [open]);

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
              appDirectory(directoryName.trim());
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
                  appDirectory(directoryName.trim());
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

export default DirectoryModal;
