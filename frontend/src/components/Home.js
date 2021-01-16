import React from 'react';

import Navbar from './Navbar'
import NewPaste from './NewPaste'

import { makeStyles } from '@material-ui/core/styles';

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
      <Navbar />
      <NewPaste />
    </>
  );
};

export default Home;
