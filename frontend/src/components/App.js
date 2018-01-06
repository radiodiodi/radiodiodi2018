import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Routes from './routes/Routes';
import theme from '../theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Routes />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
