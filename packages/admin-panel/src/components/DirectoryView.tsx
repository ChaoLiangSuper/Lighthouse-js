import _ from 'lodash';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Directory, Record, Store } from '../types';
import Navigation from './Navigation';
import ContentWrapper from './ContentWrapper';
import DirectoryModal from './DirectoryModal';
import ConfigModal from './ConfigModal';

type urlParams = {
  directoryName: string;
};

interface DirectoryViewProps extends RouteComponentProps<urlParams> {
  config: Directory;
  records: {
    [s: string]: Record;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  titleBar: {
    padding: `${theme.spacing(3)}px ${theme.spacing()}px`,
    display: 'flex',
    justifyItems: 'center'
  },
  title: {
    flexGrow: 1
  },
  row: {
    '&:hover': {
      background: theme.palette.grey[300],
      cursor: 'pointer'
    }
  }
}));

const DirectoryView: React.FC<DirectoryViewProps> = ({ config, records }) => {
  const classes = useStyles();
  const [isDirectoryModalOpen, setDirectoryModalOpen] = useState(false);
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);
  const [record, setRecord] = useState<Record | null>(null);

  if (_.isUndefined(config)) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">{config.name}</Typography>
          </Breadcrumbs>
          <div className={classes.titleBar}>
            <Typography variant="h4" component="span" className={classes.title}>
              {config.name}{' '}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disableElevation
              onClick={() => setConfigModalOpen(true)}
            >
              Edit
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                {_.map(config.keysInTable, (columnName) => (
                  <TableCell key={columnName}>{columnName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(records, (record) => (
                <TableRow
                  key={record.key}
                  className={classes.row}
                  onClick={() => {
                    setDirectoryModalOpen(true);
                    setRecord(record);
                  }}
                >
                  {_.map(config.keysInTable, (columnName) => (
                    <TableCell key={columnName}>{record[columnName]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ContentWrapper>
      <DirectoryModal
        open={isDirectoryModalOpen}
        onClose={() => {
          setDirectoryModalOpen(false);
          setRecord(null);
        }}
        data={record}
      />
      <ConfigModal open={isConfigModalOpen} onClose={() => setConfigModalOpen(false)} data={config} />
    </>
  );
};

export default connect(({ directories, records }: Store, { match }: DirectoryViewProps) => ({
  config: directories[match.params.directoryName],
  records: records[match.params.directoryName]
}))(DirectoryView);
