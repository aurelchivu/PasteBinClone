import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import axios from 'axios';
// import { login } from './../utils/login';

import Navbar from './Navbar';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginComponent = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        { email, password },
        config
      );

      if (data.succes) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        history.push('/private');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
            Log in
          </Typography>
          <FormControl>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <ReactLink to='/signup'>
                    {"Don't have an account? Sign up"}
                  </ReactLink>
                </Grid>
              </Grid>
            </form>
          </FormControl>
        </div>
      </Container>
    </>
  );
};

export default LoginComponent;
