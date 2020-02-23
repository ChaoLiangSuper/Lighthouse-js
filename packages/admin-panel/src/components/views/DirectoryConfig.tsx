import _ from 'lodash';
import React, { useState } from 'react';
import Page from '../Page';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import HorizontalContainer from '../HorizontalContainer';
import TypeChip from '../TypeChip';
import { Store, DirectoryCollection, Column } from '../../types';
import { urlParams } from '../../router';
import ConfigModal from '../modals/ConfigModal';

interface DirectoryConfigProps {
  directories: DirectoryCollection;
  updateDirectoryColumns: (name: string) => (columns: Column[]) => void;
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '25vw',
    flexShrink: 0,
    background: theme.palette.grey[200]
  },
  activeButton: {
    background: theme.palette.grey[400]
  },
  tableContainer: {
    width: '100%'
  },
  navLink: {
    padding: theme.spacing(2)
  },
  pointer: {
    cursor: 'pointer'
  }
}));

const DirectoryConfig: React.FC<DirectoryConfigProps> = ({ directories, updateDirectoryColumns }) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<urlParams>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentDirectory = directories[params.directoryName];

  console.log(selectedIndex);

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" className={classes.navLink}>
        <Link color="inherit" href="/">
          Dashboard
        </Link>
        <Link color="inherit" href={`/directory/${currentDirectory.name}`}>
          {currentDirectory.name}
        </Link>
        <Typography color="textPrimary">Schema config</Typography>
      </Breadcrumbs>
      <HorizontalContainer>
        <div className={classes.sidebar}>
          <List component="nav" subheader={<ListSubheader component="div">Directory List</ListSubheader>}>
            {_.map(directories, (directory) =>
              directory.name === currentDirectory.name ? (
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
        <div className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field name</TableCell>
                <TableCell>Field type</TableCell>
                <TableCell>Display on the main table?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(currentDirectory.columns, (column, index) => (
                <TableRow
                  key={column.name}
                  onClick={() => {
                    setSelectedIndex(index);
                    setModalOpen(true);
                  }}
                  hover
                  className={classes.pointer}
                >
                  <TableCell>{column.name}</TableCell>
                  <TableCell>
                    <TypeChip type={column.type} />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={currentDirectory.columnKeyInMainTable.includes(column.name)} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </div>
      </HorizontalContainer>
      <ConfigModal
        open={isModalOpen}
        onClose={() => {
          setSelectedIndex(0);
          setModalOpen(false);
        }}
        columns={currentDirectory.columns}
        defaultIndex={selectedIndex}
        updateDirectoryColumns={updateDirectoryColumns(currentDirectory.name)}
      />
    </Page>
  );
};

export default connect(
  ({ directories }: Store) => ({
    directories
  }),
  (dispatch) => ({
    updateDirectoryColumns: (name: string) => (columns: Column[]) =>
      dispatch({
        type: 'DIRECTORY_COLUMNS_UPDATE',
        data: {
          name,
          columns
        }
      })
  })
)(DirectoryConfig);
