import _ from 'lodash';
import React from 'react';
import Page from '../Page';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HorizontalContainer from '../HorizontalContainer';
import { Store, DirectoryCollection } from '../../types';
import { urlParams } from '../../router';

interface DirectoryConfigProps {
  directories: DirectoryCollection;
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '25vw',
    flexShrink: 0,
    background: theme.palette.grey[200]
  },
  activeButton: {
    background: theme.palette.grey[400]
  }
}));

const DirectoryConfig: React.FC<DirectoryConfigProps> = ({ directories }) => {
  const classes = useStyles();
  const history = useHistory();
  console.log(history);
  const params = useParams<urlParams>();

  return (
    <Page>
      <HorizontalContainer>
        <div className={classes.sidebar}>
          <List component="nav" subheader={<ListSubheader component="div">Directory List</ListSubheader>}>
            {_.map(directories, (directory) =>
              directory.name === params.directoryName ? (
                <ListItem key={directory.name} className={classes.activeButton}>
                  <ListItemText primary={directory.name} />
                </ListItem>
              ) : (
                <ListItem key={directory.name} button onClick={() => history.push(`${directory.name}`)}>
                  <ListItemText primary={directory.name} />
                </ListItem>
              )
            )}
          </List>
        </div>
      </HorizontalContainer>
    </Page>
  );
};

export default connect(({ directories }: Store) => ({
  directories
}))(DirectoryConfig);
