import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import App from './components/App';

import dotenv from 'dotenv';
dotenv.config();

it('renders without crashing', () => {
  fetchMock.get('begin:https://api.instagram.com', { data: [] });
  fetchMock.get(`begin:${process.env.REACT_APP_BACKEND_HTTP_URL}/programmes`, { data: [] });
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  fetchMock.restore();
});
