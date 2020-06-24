import _ from 'lodash';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField';
import Modal from '../Modal';
import DirectoryConfigContext from '../../contexts/DirectoryConfigContext';
import { DirectoryConfigAttributes } from '@lighthousejs/types/DirectoryConfig';
import FloatingLoading from '../FloatingLoading';
import * as directoryConfigsApi from '../../api/directoryConfigs';

interface DirectoryModalProps {
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

const DirectoryModal: React.FC<DirectoryModalProps> = ({ onClose }) => {
  const classes = useStyles();
  const { directoryConfigs, updateDirectoryConfig } = React.useContext(DirectoryConfigContext.Context);

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

  return (
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
                <FormField
                  placeholder="Type the new directory name"
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
  );
};

export default DirectoryModal;
