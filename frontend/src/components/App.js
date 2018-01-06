import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
