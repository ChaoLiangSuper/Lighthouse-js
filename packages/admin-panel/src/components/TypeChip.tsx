import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { fieldTypeMapping, fieldType } from '../constant';

interface TypeChipProps {
  type: fieldType;
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
      label={fieldTypeMapping[type]}
      className={clsx({
        [classes.string]: type === fieldType.STRING,
        [classes.number]: type === fieldType.NUMBER,
        [classes.boolean]: type === fieldType.BOOLEAN
      })}
    />
  );
};

export default TypeChip;
