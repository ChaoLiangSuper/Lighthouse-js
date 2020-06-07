import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ValueTypes } from '../types/types';
import { valueTypesMapping } from '../constant';

interface TypeChipProps {
  type: ValueTypes;
}

const useStyles = makeStyles({
  string: {
    color: 'white',
    backgroundColor: '#5c3e84'
  },
  number: {
    color: 'white',
    backgroundColor: '#b7472a'
  },
  boolean: {
    color: '#2a7886',
    backgroundColor: '#ededed'
  }
});

const TypeChip: React.FC<TypeChipProps> = ({ type }) => {
  const classes = useStyles();
  return (
    <Chip
      label={valueTypesMapping[type]}
      className={clsx({
        [classes.string]: type === ValueTypes.STRING,
        [classes.number]: type === ValueTypes.NUMBER,
        [classes.boolean]: type === ValueTypes.BOOLEAN
      })}
    />
  );
};

export default TypeChip;
