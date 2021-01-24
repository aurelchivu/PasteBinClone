import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Paste = ({ match }) => {
  const classes = useStyles();
  const [pastesList, setPastesList] = useState([]);

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const listPastes = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/pastes`,
        config
      );

      setPastesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPastes();
  }, []);

  const paste = pastesList.find((p) => p._id === match.params.pasteId);

  return (
    <>
      {paste ? (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              {paste.title}
            </Typography>
            <Typography variant='body2' component='p'>
              {paste.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size='small'
              variant='outlined'
              component={Link}
              to='/private'
            >
              Go back
            </Button>
          </CardActions>
        </Card>
      ) : <div>Loading...</div>}
    </>
  );
};

export default Paste;
