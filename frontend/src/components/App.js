import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Header from './common/Header';
import Footer from './common/Footer';
import Routes from './routes/Routes';
import theme from '../theme';

const Page = styled.div`
  font-family: ${p => p.theme.font.content};
`;

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Header />
          <Routes />
          <Footer />
        </Page>
      </ThemeProvider>
    );
  }
}

export default App;
