import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField, useFormikContext } from 'formik';

interface FormFieldProps {
  label?: string;
  name: string;
  disabled?: boolean;
  changeEffect?: () => void;
  select?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  margin?: TextFieldProps['margin'];
  placeholder?: string;
  className?: string;
  onKeyPress?: TextFieldProps['onKeyPress'];
  fieldType?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  children,
  disabled = false,
  changeEffect,
  select,
  fullWidth = true,
  autoFocus,
  autoComplete,
  margin,
  placeholder,
  className,
  onKeyPress,
  fieldType
}) => {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (fieldType === 'number') {
      const matchedNumber = event.target.value.match(/\d+\.?\d{0,4}/);

      event.target.value = matchedNumber ? matchedNumber[0] : '';
    }
    field.onChange(event);
    if (changeEffect) changeEffect();
  };

  const type = fieldType === 'password' ? 'password' : undefined;

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
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      margin={margin}
      placeholder={placeholder}
      className={className}
      onKeyPress={onKeyPress}
    >
      {children}
    </TextField>
  );
};

FormField.displayName = 'FormField';

export default FormField;
