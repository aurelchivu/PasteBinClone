import React from 'react';

import TextField from '@material-ui/core/TextField';

const NewPaste = () => {
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

export default NewPaste;
