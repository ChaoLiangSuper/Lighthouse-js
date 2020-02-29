import _ from 'lodash';
import React, { useState } from 'react';
import Page from '../Page';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useParams, useHistory, Link as RouterLink, Redirect } from 'react-router-dom';
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
import HorizontalContainer from '../HorizontalContainer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TypeChip from '../TypeChip';
import { Store, DirectoryCollection, Column, ValueType } from '../../types';
import { urlParams } from '../../router';
import ConfigModal from '../modals/ConfigModal';
import { fieldType } from '../../constant';

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
    width: '75vw'
  },
  navLink: {
    padding: theme.spacing(2)
  },
  pointer: {
    cursor: 'pointer'
  },
  configRow: {
    height: '60px',
    '& > td': {
      padding: '0px 16px'
    }
  },
  configColumn: {
    width: '30%'
  },
  deleteButton: {
    '& :hover': {
      color: theme.palette.secondary.dark
    }
  }
}));

const DirectoryConfig: React.FC<DirectoryConfigProps> = ({ directories, updateDirectoryColumns }) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<urlParams>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentDirectory = directories[params.directoryName];

  if (_.isUndefined(currentDirectory)) {
    return <Redirect to="/" />;
  }

  const updateCurrentDirectoryColumns = updateDirectoryColumns(currentDirectory.name);

  const renderDefaultValue = (type: fieldType, defaultValue: ValueType) => {
    if (defaultValue === '') return '─';
    switch (type) {
      case fieldType.BOOLEAN:
        return defaultValue ? 'Yes' : 'No';
      case fieldType.STRING:
      case fieldType.NUMBER:
        return defaultValue;
      default:
        return null;
    }
  };

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" className={classes.navLink}>
        <Link color="inherit" component={RouterLink} to="/">
          Dashboard
        </Link>
        <Link color="inherit" component={RouterLink} to={`/directory/${currentDirectory.name}`}>
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
                <TableCell className={classes.configColumn}>Field name</TableCell>
                <TableCell className={classes.configColumn}>Field type</TableCell>
                <TableCell className={classes.configColumn}>Default value</TableCell>
                <TableCell />
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
                  className={clsx(classes.pointer, classes.configRow)}
                >
                  <TableCell>{column.name}</TableCell>
                  <TableCell>
                    <TypeChip type={column.type} />
                  </TableCell>
                  <TableCell>{renderDefaultValue(column.type, column.defaultValue)}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newColumns = [...currentDirectory.columns];
                        _.pullAt(newColumns, index);
                        updateCurrentDirectoryColumns(newColumns);
                      }}
                      className={classes.deleteButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                hover
                className={clsx(classes.pointer, classes.configRow)}
                onClick={() => {
                  setSelectedIndex(currentDirectory.columns.length);
                  setModalOpen(true);
                }}
              >
                <TableCell colSpan={4} align="center">
                  Add new column
                </TableCell>
              </TableRow>
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
        updateDirectoryColumns={updateCurrentDirectoryColumns}
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
