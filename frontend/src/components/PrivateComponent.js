import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import ReactTimeAgo from 'react-time-ago';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    justify: 'flex-end',
  },
}));

const PrivateComponent = ({ history }) => {
  const classes = useStyles();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [pastesList, setPastesList] = useState([]);

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const createPaste = async (content, title) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/pastes`,
        { content, title },
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

      console.log(data);

      setPastesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (userInfoFromStorage) {
  //     history.push('/private');
  //   }
  // }, [history, userInfoFromStorage]);

  useEffect(() => {
    listPastes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPaste(content, title);
    setContent('');
    setTitle('');
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    document.location.href = '/';
  };
  
  return (
    <>
      <AppBar className={classes.root} position='static' color='default'>
        <Toolbar>
          {userInfoFromStorage && userInfoFromStorage.username && (
            <h3>{userInfoFromStorage.username}</h3>
          )}
          <Grid container justify='flex-end'>
            <Button
              onClick={logout}
              variant='contained'
              component={Link}
              to='/signup'
            >
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <br />
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              value={content}
              onInput={(e) => setContent(e.target.value)}
              required
              id='outlined-multiline-static'
              label='New Paste'
              multiline
              rows={15}
              style={{ width: '80%' }}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              required
              id='outlined-multiline-static'
              label='Title'
              multiline
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type='submit'
              variant='outlined'
              color='default'
              className={classes.submit}
            >
              create new paste
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <Grid item xs={12} sm={12}>
        <h3>My pastes</h3>
      </Grid>
      <ul>
        {pastesList ? (
          Object.values(pastesList).map((paste) => {
            return (
              <li key={paste._id}>
                <Link
                  to={`private/pastes/${paste._id}`}
                  style={{ color: 'green', textDecoration: 'none' }}
                >
                  {paste.title}
                </Link>
                {' - '}
                <ReactTimeAgo date={new Date(paste.createdAt)} locale='en-US' />
              </li>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </>
  );
};

export default PrivateComponent;
