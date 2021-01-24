import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import LoginComponent from './components/LoginComponent';
import PrivateComponent from './components/PrivateComponent';
import SignUpComponent from './components/SignUpComponent';
import Paste from './components/Paste'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const styles = (theme) => ({
  '@global': {
    body: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      height: 'fixed',
      position: 'center',
    },
    html: {
      height: '100%',
    },
    '#componentWithId': {
      height: '100%',
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Route
          exact
          path='/login'
          render={(props) => <LoginComponent {...props} />}
        />
        <Route
          exact
          path='/signup'
          render={(props) => <SignUpComponent {...props} />}
        />
        <Route
          exact
          path='/private'
          render={(props) => <PrivateComponent {...props} />}
        />
        <Route
          exact
          path='/private/pastes/:pasteId'
          component={Paste}
        />
      </ThemeProvider>
    </>
  );
};

export default withStyles(styles)(App);
