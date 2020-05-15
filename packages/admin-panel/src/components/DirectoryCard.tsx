import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import DirectoryModal from './modals/DirectoryModal';
import { Directory } from '../types/types';

interface EmptyDirectoryCardProps {
  isEmpty: true;
  directory?: Directory;
}

interface DirectoryCardProps {
  isEmpty?: false;
  directory?: Directory;
}

const useStyles = makeStyles({
  card: {
    height: 150,
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    flexGrow: 1
  },
  newButton: {
    textAlign: 'center'
  },
  buttonDetailBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

const DirectoryCard: React.FC<EmptyDirectoryCardProps | DirectoryCardProps> = ({
  isEmpty,
  directory
}: EmptyDirectoryCardProps | DirectoryCardProps) => {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [menuTarget, setMenuTarget] = useState<HTMLButtonElement | null>(null);
  const history = useHistory();

  if (isEmpty) {
    return (
      <>
        <Card variant="outlined" className={classes.card}>
          <CardActionArea className={clsx(classes.button, classes.newButton)} onClick={() => setModalOpen(true)}>
            <AddCircleOutlineIcon style={{ fontSize: 60, color: grey[400] }} />
          </CardActionArea>
        </Card>
        <DirectoryModal open={isModalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (!directory) return null;

  const currentDirectoryPath = `/directory/${encodeURIComponent(directory.name)}`;

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardActionArea className={classes.button} onClick={() => history.push(`${currentDirectoryPath}/records`)}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {directory.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttonDetailBar}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${directory.numOfRecords} records`}
          </Typography>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setMenuTarget(event.currentTarget);
            }}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Menu anchorEl={menuTarget} open={Boolean(menuTarget)} onClose={() => setMenuTarget(null)}>
        <MenuItem onClick={() => history.push(`${currentDirectoryPath}/config`)}>Edit config</MenuItem>
      </Menu>
    </>
  );
};

export default DirectoryCard;
