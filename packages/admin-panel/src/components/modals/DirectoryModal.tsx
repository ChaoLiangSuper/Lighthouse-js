import _ from 'lodash';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import Modal from '../Modal';
import DirectoriesContext from '../../contexts/DirectoriesContext';
import { DirectoryConfigAttributes } from '../../../../types/DirectoryConfig';
import FloatingLoading from '../FloatingLoading';
import * as directoryConfigsApi from '../../api/directoryConfigs';

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
  const { directoryConfigs, updateDirectoryConfig } = React.useContext(DirectoriesContext.Context);

  const initialValues = {
    directoryName: ''
  };

  const validationSchema = Yup.object().shape({
    directoryName: Yup.string()
      .test(
        'no-duplicate',
        'Directory name exists',
        (value) =>
          !_(directoryConfigs)
            .keys()
            .includes(value)
      )
      .required('Required')
  });

  const handleSubmit = async (
    { directoryName }: Pick<DirectoryConfigAttributes, 'directoryName'>,
    { setErrors }: FormikHelpers<Pick<DirectoryConfigAttributes, 'directoryName'>>
  ) => {
    try {
      const newDirectoryConfig = await directoryConfigsApi.addNewDirectoryConfig({
        directoryName: directoryName.trim(),
        fields: []
      });
      updateDirectoryConfig(newDirectoryConfig);
      onClose();
    } catch ({ response }) {
      if (response) {
        setErrors({ directoryName: response.data.msg });
      } else {
        setErrors({ directoryName: 'Network Error' });
      }
    }
  };

  return open ? (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ submitForm, isSubmitting, errors }) => (
        <Form>
          <Modal
            onClose={onClose}
            title="New directory"
            maxHeight={300}
            buttons={
              <>
                <Button className={classes.button} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  disabled={!!errors['directoryName']}
                >
                  Save
                </Button>
              </>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  placeholder="Type the new directory name"
                  id="directoryName"
                  name="directoryName"
                  className={classes.inputField}
                  onKeyPress={({ key }: React.KeyboardEvent) => {
                    if (key === 'Enter' && !errors['directoryName']) {
                      submitForm();
                    }
                  }}
                  autoFocus={true}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            {isSubmitting && <FloatingLoading text="Updating..." />}
          </Modal>
        </Form>
      )}
    </Formik>
  ) : null;
};

export default DirectoryModal;
