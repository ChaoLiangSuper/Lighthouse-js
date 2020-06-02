import _ from 'lodash';
import React from 'react';
import clsx from 'clsx';
import { Redirect, useRouteMatch, useHistory, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { UrlParams } from '../types/types';
import Page from '../components/Page';
import RecordModal from '../components/modals/RecordModal';
import DirectoriesContext from '../contexts/DirectoriesContext';
import RecordsContext from '../contexts/RecordsContext';

const useStyles = makeStyles((theme) => ({
  titleBar: {
    padding: `0px ${theme.spacing(2)}px ${theme.spacing(3)}px `,
    display: 'flex',
    justifyItems: 'center'
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    padding: theme.spacing(2)
  },
  pointer: {
    cursor: 'pointer'
  },
  recordRow: {
    height: '60px',
    '& > td': {
      padding: '0px 16px'
    }
  }
}));

const RecordsView: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { params } = useRouteMatch<UrlParams>();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedRecordKey, setSelectedRecordKey] = React.useState<string | null>(null);
  const { directories } = React.useContext(DirectoriesContext.Context);
  const { records: recordsCollection } = React.useContext(RecordsContext.Context);
  const config = directories[params.directoryName];
  const records = recordsCollection[params.directoryName];

  if (_.isUndefined(config)) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb" className={classes.navLink}>
        <Link color="inherit" component={RouterLink} to="/directory">
          Directories
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
          onClick={() => history.push(`config`)}
        >
          Edit
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            {_.map(config.columns, ({ name }) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(records, (record) => (
            <TableRow
              hover
              key={record.key}
              onClick={() => {
                setModalOpen(true);
                setSelectedRecordKey(record.key);
              }}
              className={clsx(classes.pointer, classes.recordRow)}
            >
              <TableCell>{record.key}</TableCell>
              {_.map(config.columns, ({ name }) => (
                <TableCell key={name}>{record[name]}</TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow
            hover
            className={clsx(classes.pointer, classes.recordRow)}
            onClick={() => {
              setModalOpen(true);
              setSelectedRecordKey(null);
            }}
          >
            <TableCell colSpan={config.columns.length + 1} align="center">
              Add new record
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <RecordModal
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedRecordKey(null);
        }}
        recordKey={selectedRecordKey}
      />
    </Page>
  );
};

export default RecordsView;
