import 'whatwg-fetch';

const BACKEND_URL = process.env.REACT_APP_BACKEND_HTTP_URL;

const checkJWTAuth = async code => {
  try {
    const resp = await fetch(`${BACKEND_URL}/admin/auth?code=${code}`);
    const data = await resp.json();
  
    console.log('Backend auth response:');
    console.log(data);

    return !!data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {
  checkJWTAuth,
}