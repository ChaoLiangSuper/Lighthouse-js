import _ from 'lodash';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal';
import DirectoryConfigContext from '../../contexts/DirectoryConfigContext';
import StatusContext from '../../contexts/StatusContext';
import { ValueTypes } from '../../types/types';
import { FieldConfig } from '@lighthousejs/types/DirectoryConfig';
import { valueTypesMapping } from '../../constant';
import FormField from '../FormField';
import FloatingLoading from '../FloatingLoading';
import * as directoryConfigsApi from '../../api/directoryConfigs';
import { StatusType } from '../../types/status';
import { generateDefaultField } from '../../utils/generateField';

interface ConfigModalProps {
  onClose: () => void;
  selectedIndex: number;
  moveToNextIndex: () => void;
  directoryName: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  },
  nextButton: {
    color: 'white',
    backgroundColor: '#30475e'
  }
}));

const defaultField: FieldConfig = {
  fieldName: '',
  type: ValueTypes.STRING,
  defaultValue: ''
};

const ConfigModal: React.FC<ConfigModalProps> = ({ onClose, selectedIndex, moveToNextIndex, directoryName }) => {
  const classes = useStyles();
  const { directoryConfigs, updateDirectoryConfig } = React.useContext(DirectoryConfigContext.Context);
  const { addStatus } = React.useContext(StatusContext.Context);

  const { fields } = directoryConfigs[directoryName];

  const initialValues = (selectedIndex: number) => fields[selectedIndex] || defaultField;

  const validationSchema = Yup.object().shape({
    fieldName: Yup.string()
      .test('no-duplicate', 'Feild name exists', (value) => {
        const index = _.findIndex(fields, ({ fieldName }) => fieldName === value);
        return index === selectedIndex || index === -1;
      })
      .required('Required'),
    type: Yup.string().required('Required'),
    defaultValue: Yup.mixed().test('valid-value', 'Not valid', async function(value) {
      switch (this.parent.type) {
        case ValueTypes.STRING: {
          return await Yup.string().isValid(value);
        }
        case ValueTypes.BOOLEAN: {
          return value === undefined || value === 'true' || value === 'false';
        }
        case ValueTypes.NUMBER: {
          return value === undefined || !_.isNaN(Number(value));
        }
        default:
          return false;
      }
    })
  });

  const handleSubmit = async (values: FieldConfig) => {
    const newfields = [...fields];
    newfields[selectedIndex] = values;
    try {
      const updatedDirectoryConfig = await directoryConfigsApi.updateDirectoryConfig({
        ...directoryConfigs[directoryName],
        fields: newfields
      });
      updateDirectoryConfig(updatedDirectoryConfig);
      addStatus({ message: 'Directory updated.', type: StatusType.info });
      return Promise.resolve();
    } catch (err) {
      addStatus({ message: 'Directory update failed.', type: StatusType.error });
      return Promise.reject();
    }
  };

  return (
    <Formik
      initialValues={initialValues(selectedIndex)}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ submitForm, isValid, values, setFieldValue, isSubmitting, setValues, setTouched }) => (
        <Form>
          <Modal
            onClose={onClose}
            title="Column config"
            buttons={
              <>
                <Button disabled={isSubmitting} className={classes.button} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting || !isValid}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await submitForm();
                    onClose();
                  }}
                >
                  Save
                </Button>
                <Button
                  disabled={isSubmitting || !isValid}
                  className={clsx(classes.button, classes.nextButton)}
                  variant="contained"
                  onClick={async () => {
                    await submitForm();
                    moveToNextIndex();
                    setValues(initialValues(selectedIndex + 1));
                    setTouched({});
                  }}
                >
                  Save and next
                </Button>
              </>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormField name="fieldName" label="Field name" />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  name="type"
                  select={true}
                  label="Field type"
                  changeEffect={() => setFieldValue('defaultValue', initialValues(selectedIndex).defaultValue)}
                >
                  {_.map(ValueTypes, (type) => (
                    <MenuItem key={type} value={type}>
                      {valueTypesMapping[type]}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>
              <Grid item xs={12}>
                {generateDefaultField(values.type)}
              </Grid>
            </Grid>
            {isSubmitting && <FloatingLoading text="Updating..." />}
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigModal;
