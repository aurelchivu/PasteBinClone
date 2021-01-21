import React from 'react';

import Navbar from './Navbar'

import TextField from '@material-ui/core/TextField';

const Home = () => {
  return (
    <>
      <Navbar />
      <TextField
        id='outlined-multiline-static'
        label='New Paste'
        multiline
        rows={15}
        style={{ width: '80%' }}
        variant='outlined'
      />
    </>
  );
};

export default Home;
