import React from 'react';
import { ValueTypes } from '@lighthousejs/types/constants';
import BooleanField from '../components/Fields/BooleanField';
import NumberField from '../components/Fields/NumberField';
import StringField from '../components/Fields/StringField';

export const generateValueField = (type: ValueTypes, name: string, label: string) => {
  const defaultProps = { name, label };

  switch (type) {
    case ValueTypes.BOOLEAN:
      return <BooleanField {...defaultProps} texts={{ true: 'Yes', false: 'No' }} />;
    case ValueTypes.NUMBER:
      return <NumberField {...defaultProps} />;
    case ValueTypes.STRING:
      return <StringField {...defaultProps} />;
    default:
      return null;
  }
};

export const generateDefaultField = (type: ValueTypes) => {
  const defaultProps = {
    name: 'defaultValue',
    label: 'Default value'
  };

  switch (type) {
    case ValueTypes.BOOLEAN:
      return <BooleanField {...defaultProps} texts={{ default: 'No default value', true: 'Yes', false: 'No' }} />;
    case ValueTypes.NUMBER:
      return <NumberField {...defaultProps} />;
    case ValueTypes.STRING:
      return <StringField {...defaultProps} />;
    default:
      return null;
  }
};
