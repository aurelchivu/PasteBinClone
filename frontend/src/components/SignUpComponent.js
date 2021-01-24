import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import axios from 'axios';
import { login } from './../utils/login';

import Navbar from './Navbar';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpComponent = ({ location, history }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async (username, email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { username, email, password },
        config
      );

      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        login(email, password);
        history.push('/private');
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(username, email, password);
  };

  return (
    <>
      <Navbar />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Choose a password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword}
                  onInput={(e) => setConfirmPassword(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  name='confirm password'
                  label='Confirm Password'
                  type='password'
                  id='password'
                  autoComplete='confirm-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid alignItems='center'>
                <ReactLink to='/login'>
                  Already have an account? Log in
                </ReactLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUpComponent;
