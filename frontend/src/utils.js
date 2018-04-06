import 'whatwg-fetch';
import Cookie from 'universal-cookie';
import { setTimeout } from 'timers';

const cookie = new Cookie();

const BACKEND_URL = process.env.REACT_APP_BACKEND_HTTP_URL;
const MUSIC_LIBRARY_URL = process.env.REACT_APP_MUSIC_LIBRARY_URL;

class AuthError extends Error {
  constructor() {
    super('Unauthorized');
    this.unauthorized = true;
  }
}

/**
 * Create Request object
 * @param {String} endpoint 
 * @param {String} id_token 
 * @param {String} method
 * @param {Object} body
 */
const composeRequest = (endpoint, id_token, method = 'GET', body = null) => {
  const token = id_token || cookie.get('jwt');

  const headers = new Headers();
  headers.append('Authorization', token);
  const req = new Request(endpoint, {
    headers,
    method,
    body,
  });

  return req;
}

const isJSON = resp => {
  return resp && resp.headers && resp.headers.get('Content-Type').includes('application/json');
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

    if (resp.status === 401) {
      throw new AuthError();
    } 
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);

    return data.messages;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const removeMessage = async id => {
  const req = composeRequest(`${BACKEND_URL}/admin/messages/remove/${id}`, null, 'DELETE');

  try {
    const resp = await fetch(req);

    if (resp.status === 401) {
      throw new AuthError();
    } 
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const banUserForMessage = async id => {
  const req = composeRequest(`${BACKEND_URL}/admin/users/ban/${id}`, null, 'DELETE');

  try {
    const resp = await fetch(req);

    if (resp.status === 401) {
      throw new AuthError();
    } 
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const liftBan = async ip => {
  const req = composeRequest(`${BACKEND_URL}/admin/users/unban/${ip}`, null, 'DELETE');

  try {
    const resp = await fetch(req);

    if (resp.status === 401) {
      throw new AuthError();
    } 
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const fetchBans = async () => {
  const req = composeRequest(`${BACKEND_URL}/admin/users/banned`, null, 'GET');

  try {
    const resp = await fetch(req);

    if (resp.status === 401) {
      throw new AuthError();
    } 
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);

    return data.bans;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const wait = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time);
});

const fetchSongsByField = async (field, title) => {
  const req = composeRequest(`${MUSIC_LIBRARY_URL}/${field}/${title}`, null, 'GET');
  try {
    const resp = await fetch(req);

    if (resp.status === 429) { // too many requests
      await wait(1000); // ms
      return fetchSongsByField(field, title);
    }
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);

    return data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const fetchSongs = async () => {
  const req = composeRequest(`${MUSIC_LIBRARY_URL}`, null, 'GET');
  try {
    const resp = await fetch(req);

    if (resp.status === 429) { // too many requests
      await wait(1000); // ms
      return fetchSongs();
    }
    
    const data = isJSON(resp)
      ? await resp.json()
      : await resp.text();

    if (!resp.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(resp.statusText);
      }
    }

    console.log('Backend messages response:');
    console.log(data);

    return data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const registerProgramme = async data => {
  const body = JSON.stringify(data);
  const req = composeRequest(`${BACKEND_URL}/api/register`, null, 'POST', body);

  try {
    const resp = await fetch(req);
    return resp.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}


export {
  checkJWTAuth,
  fetchMessages,
  removeMessage,
  banUserForMessage,
  fetchBans,
  liftBan,
  AuthError,
  fetchSongsByField,
  fetchSongs,
  registerProgramme,
}
