import React from 'react';
import { Link } from 'react-router-dom';
import NewPaste from './NewPaste';

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

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const PrivateComponent = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AppBar className={classes.root} position='static' color='default'>
        <Toolbar>
          <h2>{userInfoFromStorage.username}</h2>
          <Grid container justify='flex-end'>
            <Button variant='contained' component={Link} to='/signup'>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <br />
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <TextField
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
