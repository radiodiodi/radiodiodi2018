import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import Routes from './routes/Routes';
import theme from '../theme';
import trans from './Locale';

import dotenv from 'dotenv';
dotenv.config();

class TranslationProvider extends Component {
  getChildContext() {
    return {
      trans,
    };
  }

  render() {
    return this.props.children;
  }
}

TranslationProvider.childContextTypes = {
  trans: PropTypes.object,
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <TranslationProvider>
          <Routes />
        </TranslationProvider>
      </ThemeProvider>
    );
  }
}

export default App;
