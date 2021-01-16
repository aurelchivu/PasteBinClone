import React, { useState, getState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const PrivateComponent = () => {
  const classes = useStyles();

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const [newPaste, setNewPaste] = useState('');

  const createPaste = (newPaste) => async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/pastes`,
        {content: newPaste},
        config
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPaste(newPaste)();
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('newUser');
    document.location.href = '/';
  };

  return (
    <>
      <AppBar className={classes.root} position='static' color='default'>
        <Toolbar>
          <h3>{userInfoFromStorage.username}</h3>
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
          <TextField
            value={newPaste}
            onInput={(e) => setNewPaste(e.target.value)}
            required
            id='outlined-multiline-static'
            label='New Paste'
            multiline
            rows={15}
            style={{ width: '80%' }}
            variant='outlined'
          />
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
    </>
  );
};

export default PrivateComponent;
