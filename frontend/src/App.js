import React from 'react';
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Typography, createMuiTheme } from '@material-ui/core';

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
        <Header />
        <main>
          <Body />
        </main>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default withStyles(styles)(App);
