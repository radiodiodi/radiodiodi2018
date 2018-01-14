import React from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './routes/Routes';
import theme from '../theme';

import dotenv from 'dotenv';
dotenv.config();

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }
}

export default App;
