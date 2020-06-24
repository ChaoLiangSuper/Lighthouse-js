import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormField from '../FormField';

interface BooleanFieldProps {
  name: string;
  label: string;
  texts: {
    default?: string;
    true: string;
    false: string;
  };
}

const BooleanField: React.FC<BooleanFieldProps> = ({ name, label, texts }) => (
  <FormField name={name} label={label} select={true}>
    {texts.default === undefined ? null : <MenuItem value="">No default value</MenuItem>}
    <MenuItem value="true">{texts.true}</MenuItem>
    <MenuItem value="false">{texts.false}</MenuItem>
  </FormField>
);

export default BooleanField;
