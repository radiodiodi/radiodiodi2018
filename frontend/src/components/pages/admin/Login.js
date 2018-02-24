import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { checkJWTAuth } from '../../../utils';

const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${p => p.theme.color.white};
`;

const Login = styled(GoogleLogin)`
  padding: 1rem;
  margin: 1rem;
  background-color: ${p => p.theme.color.white};
  font-family: 'Comfortaa';
  font-size: 1rem;
`;

const Error = styled.i`
  color: ${p => p.theme.color.yellow};
  margin: 1rem 0;
`;

class LoginPage extends Component {
  state = {
    error: '',
  }

  goToAdmin = () => {
    const { history } = this.props;
    history.push('/admin');
  }

  responseGoogle = async resp => {
    console.log(resp);
    if (resp.error) {
      console.log('Login error.')
      this.setState({
        error: resp.error,
      });
      return;
    }

    const { code } = resp;
    const ok = await checkJWTAuth(code);
    if (ok) {
      this.goToAdmin();
    } else {
      console.log('Backend auth verification failed.');
      this.setState({
        error: 'Backend auth verification failed.',
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <Container>
        <h2>Log in to Radiodiodi admin</h2>
        <i>Use your Radiodiodi.fi domain email.</i>
        <Login
          clientId={CLIENT_ID}
          buttonText="Log in"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          hostedDomain="radiodiodi.fi"
          responseType="code"
          signedIn
        />
        { error && <Error>Error: { error }</Error> }
      </Container>
      
    );
  }
}

export default LoginPage;