import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.root} position='static' color='default'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            Pastebin
          </Button>
          <Grid container justify='flex-end'>
            <Button
              className={classes.menuButton}
              variant='outlined'
              color='inherit'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              component={Link}
              to='/signup'
            >
              Sign up
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Home;
