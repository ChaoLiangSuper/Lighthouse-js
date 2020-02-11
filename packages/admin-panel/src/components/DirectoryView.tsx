// import _ from 'lodash';
import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { Directory, Store } from '../types';

interface DirectoryViewProps {
  directory: Directory;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  return <div>{directory}</div>;
};

export default connect(({ directories, viewState }: Store) => ({
  directory: directories[viewState.state.key]
}))(DirectoryView);
