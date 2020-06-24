import _ from 'lodash';
import React from 'react';
import Page from '../components/Page';
import clsx from 'clsx';
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
import HorizontalContainer from '../components/HorizontalContainer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TypeChip from '../components/TypeChip';
import { ValueTypes, UrlParams } from '../types/types';
import ConfigModal from '../components/modals/ConfigModal';
import DirectoryConfigContext from '../contexts/DirectoryConfigContext';
import StatusContext from '../contexts/StatusContext';
import { FieldConfig } from '@lighthousejs/types/DirectoryConfig';
import * as directoryConfigsApi from '../api/directoryConfigs';
import { StatusType } from '../types/status';

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

const DirectoryConfig: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currentDirectoryName } = useParams<UrlParams>();
  const { directoryConfigs, updateDirectoryConfig } = React.useContext(DirectoryConfigContext.Context);
  const { addStatus } = React.useContext(StatusContext.Context);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  if (_.isUndefined(directoryConfigs[currentDirectoryName])) {
    return <Redirect to="/" />;
  }

  const { fields } = directoryConfigs[currentDirectoryName];

  const renderDefaultValue = ({ type, defaultValue }: FieldConfig) => {
    if (_.isUndefined(defaultValue)) return '─';
    switch (type) {
      case ValueTypes.BOOLEAN:
        return defaultValue ? 'Yes' : 'No';
      case ValueTypes.STRING:
      case ValueTypes.NUMBER:
        return defaultValue;
      default:
        return null;
    }
  };

  const moveToNextIndex = () =>
    setSelectedIndex((prevIndex) => {
      if (typeof prevIndex === 'number') return prevIndex + 1;
      return prevIndex;
    });

  const handleDelete = async (fields: FieldConfig[]) => {
    try {
      const updatedDirectoryConfig = await directoryConfigsApi.updateDirectoryConfig({
        ...directoryConfigs[currentDirectoryName],
        fields
      });
      updateDirectoryConfig(updatedDirectoryConfig);
      addStatus({ message: 'Directory updated.', type: StatusType.info });
    } catch (err) {
      addStatus({ message: 'Directory update failed.', type: StatusType.error });
    }
  };

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" className={classes.navLink}>
        <Link color="inherit" component={RouterLink} to="/directory">
          Directories
        </Link>
        <Link color="inherit" component={RouterLink} to={`/directory/${currentDirectoryName}/records`}>
          {currentDirectoryName}
        </Link>
        <Typography color="textPrimary">Schema config</Typography>
      </Breadcrumbs>
      <HorizontalContainer>
        <div className={classes.sidebar}>
          <List component="nav" subheader={<ListSubheader component="div">Directory List</ListSubheader>}>
            {_.map(directoryConfigs, ({ directoryName }) =>
              directoryName === currentDirectoryName ? (
                <ListItem key={directoryName} className={classes.activeButton}>
                  <ListItemText primary={directoryName} />
                </ListItem>
              ) : (
                <ListItem
                  key={directoryName}
                  button
                  onClick={() => history.push(`/directory/${encodeURIComponent(directoryName)}/config`)}
                >
                  <ListItemText primary={directoryName} />
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
              {_.map(fields, (field, index) => {
                const { fieldName, type } = field;
                return (
                  <TableRow
                    key={fieldName}
                    onClick={() => {
                      setSelectedIndex(index);
                    }}
                    hover
                    className={clsx(classes.pointer, classes.configRow)}
                  >
                    <TableCell>{fieldName}</TableCell>
                    <TableCell>
                      <TypeChip type={type} />
                    </TableCell>
                    <TableCell>{renderDefaultValue(field)}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newFields = [...fields];
                          _.pullAt(newFields, index);
                          handleDelete(newFields);
                          // updateDirectoryConfig({
                          //   ...directoryConfigs[currentDirectoryName],
                          //   fields: newFields
                          // });
                        }}
                        className={classes.deleteButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow
                hover
                className={clsx(classes.pointer, classes.configRow)}
                onClick={() => {
                  setSelectedIndex(fields.length);
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
      {selectedIndex !== null ? (
        <ConfigModal
          selectedIndex={selectedIndex}
          moveToNextIndex={moveToNextIndex}
          onClose={() => {
            setSelectedIndex(null);
          }}
          directoryName={currentDirectoryName}
        />
      ) : null}
    </Page>
  );
};

export default DirectoryConfig;
