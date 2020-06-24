import React from 'react';
import FormField from '../FormField';

interface StringFieldProps {
  name: string;
  label: string;
}

const StringField: React.FC<StringFieldProps> = ({ name, label }) => <FormField name={name} label={label} />;

export default StringField;
