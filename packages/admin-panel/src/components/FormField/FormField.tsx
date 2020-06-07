import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useField, useFormikContext } from 'formik';

interface FormFieldProps {
  label: string;
  name: string;
  disabled?: boolean;
  changeEffect?: () => void;
  select?: boolean;
  fullWidth?: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  children,
  disabled = false,
  changeEffect,
  select,
  fullWidth = true,
  type
}) => {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    field.onChange(event);
    if (changeEffect) changeEffect();
  };

  return (
    <TextField
      {...field}
      value={field.value || ''}
      onChange={handleChange}
      disabled={disabled || isSubmitting}
      label={label}
      type={type}
      select={select}
      variant="outlined"
      fullWidth={fullWidth}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    >
      {children}
    </TextField>
  );
};

FormField.displayName = 'FormField';

export default FormField;
