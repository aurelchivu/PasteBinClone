import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
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

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <TextField
        id='outlined-multiline-static'
        label='New Paste'
        multiline
        rows={15}
        style = {{width: '80%'}} 
        variant='outlined'
      />
    </>
  );
};

export default Home;
