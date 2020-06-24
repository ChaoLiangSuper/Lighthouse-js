import _ from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ValueTypes } from '@lighthousejs/types/constants';
import { RecordDataAttributes, DataType } from '@lighthousejs/types/RecordData';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { UrlParams } from '../../types/types';
import Modal from '../Modal';
import DirectoryConfigContext from '../../contexts/DirectoryConfigContext';
import RecordsContext from '../../contexts/RecordDataContext';
import StatusContext from '../../contexts/StatusContext';
import { generateValueField } from '../../utils/generateField';
import * as recordDataApi from '../../api/recordData';
import { StatusType } from '../../types/status';

interface RecordModalProps {
  onClose: () => void;
  recordDataId: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0px ${theme.spacing()}px`
  }
}));

const RecordModal: React.FC<RecordModalProps> = ({ onClose, recordDataId }) => {
  const classes = useStyles();
  const { currentDirectoryName } = useParams<UrlParams>();
  const { directoryConfigs } = React.useContext(DirectoryConfigContext.Context);
  const { addStatus } = React.useContext(StatusContext.Context);
  const { recordDataset, updateRecordData } = React.useContext(RecordsContext.Context);
  const { fields, id: directoryConfigId } = directoryConfigs[currentDirectoryName];

  const newRecordData = {
    id: recordDataId,
    directoryConfigId,
    data: _.reduce(
      fields,
      (result, { fieldName, type }) => {
        return {
          ...result,
          [fieldName]: {
            fieldName,
            value: '',
            type
          }
        };
      },
      {} as RecordDataAttributes['data']
    )
  };

  const recordData = recordDataset[recordDataId] || newRecordData;

  const handleSubmit = async (value: Record<string, DataType>) => {
    const editedRecordData = {
      ...recordData,
      data: value
    };
    try {
      let returnedRecordData: RecordDataAttributes;
      if (recordDataId.indexOf('new-record') === -1) {
        returnedRecordData = await recordDataApi.updateRecordData(directoryConfigId, editedRecordData);
      } else {
        returnedRecordData = await recordDataApi.addNewRecordData(directoryConfigId, editedRecordData);
      }
      updateRecordData(returnedRecordData);
      addStatus({ message: 'Record updated.', type: StatusType.info });
      return Promise.resolve();
    } catch (err) {
      addStatus({ message: 'Record update failed.', type: StatusType.error });
      return Promise.reject();
    }
  };

  // const handleSubmit = async (values: FieldConfig) => {
  //   const newfields = [...fields];
  //   newfields[selectedIndex] = values;
  //   try {
  //     const updatedDirectoryConfig = await directoryConfigsApi.updateDirectoryConfig({
  //       ...directoryConfigs[directoryName],
  //       fields: newfields
  //     });
  //     updateDirectoryConfig(updatedDirectoryConfig);
  //     addStatus({ message: 'Directory updated.', type: StatusType.info });
  //     return Promise.resolve();
  //   } catch (err) {
  //     addStatus({ message: 'Directory update failed.', type: StatusType.error });
  //     return Promise.reject();
  //   }
  // };

  // const handleSubmit = async (
  //   { directoryName }: Pick<DirectoryConfigAttributes, 'directoryName'>,
  //   { setErrors }: FormikHelpers<Pick<DirectoryConfigAttributes, 'directoryName'>>
  // ) => {
  //   try {
  //     const newDirectoryConfig = await directoryConfigsApi.addNewDirectoryConfig({
  //       directoryName: directoryName.trim(),
  //       fields: []
  //     });
  //     updateDirectoryConfig(newDirectoryConfig);
  //     onClose();
  //   } catch ({ response }) {
  //     if (response) {
  //       setErrors({ directoryName: response.data.msg });
  //     } else {
  //       setErrors({ directoryName: 'Network Error' });
  //     }
  //   }
  // };

  const validationSchema = Yup.object().shape(
    _.reduce(
      fields,
      (result, { fieldName, type }) => {
        switch (type) {
          case ValueTypes.STRING: {
            result[fieldName] = Yup.object().shape({
              value: Yup.string().required('Please input a valid value')
            });
            return result;
          }
          case ValueTypes.BOOLEAN: {
            result[fieldName] = Yup.object().shape({
              value: Yup.string().required('Please input a valid value')
            });
            return result;
          }
          case ValueTypes.NUMBER: {
            result[fieldName] = Yup.object().shape({
              value: Yup.string().test(
                'validNumber',
                'Please input a valid value',
                (value) => value.indexOf('.') !== 0 && value.indexOf('.') !== value.length - 1
              )
            });
            return result;
          }
          default:
            return result;
        }
      },
      {} as Record<string, Yup.ObjectSchema<Yup.Shape<object | undefined, { value: string | undefined }>>>
    )
  );

  return (
    <Formik
      initialValues={recordData.data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <Form>
          <Modal
            onClose={onClose}
            title="New data entry"
            buttons={
              <>
                <Button className={classes.button} onClick={onClose}>
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
              </>
            }
          >
            <Grid container spacing={3}>
              {_.map(fields, ({ fieldName, type }) => (
                <Grid item xs={6} key={fieldName}>
                  {generateValueField(type, `${fieldName}.value`, fieldName)}
                </Grid>
              ))}
            </Grid>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default RecordModal;
