import React from 'react';
import FormField from '../FormField';

interface NumberFieldProps {
  name: string;
  label: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ name, label }) => (
  <FormField name={name} label={label} fieldType="number" />
);

export default NumberField;
