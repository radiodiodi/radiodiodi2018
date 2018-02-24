import 'whatwg-fetch';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

const BACKEND_URL = process.env.REACT_APP_BACKEND_HTTP_URL;

class AuthError extends Error {
  constructor() {
    super('Unauthorized');
    this.unauthorized = true;
  }
}

const composeRequest = (endpoint, id_token) => {
  const token = id_token || cookie.get('jwt');

  const headers = new Headers();
  headers.append('Authorization', token);
  const req = new Request(endpoint, {
    headers,
    method: 'GET',
  });

  return req;
}

const checkJWTAuth = async token => {
  const req = composeRequest(`${BACKEND_URL}/auth`, token);

  try {
    const resp = await fetch(req);
  
    console.log('Backend auth response:');
    console.log(resp);

    return resp.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const fetchMessages = async () => {
  const req = composeRequest(`${BACKEND_URL}/admin/messages`);

  try {
    const resp = await fetch(req);
    const data = await resp.json();

    if (data.error) {
      throw new Error(data.error);
    }

    console.log('Backend messages response:');
    console.log(data);

    return data.messages;
  } catch (err) {
    throw new AuthError();
  }
};

export {
  checkJWTAuth,
  fetchMessages,
  AuthError,
}