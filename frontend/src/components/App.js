import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Header from './common/Header';
import Footer from './common/Footer';
import Routes from './routes/Routes';
import theme from '../theme';

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
