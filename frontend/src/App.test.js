import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import App from './components/App';

it('renders without crashing', () => {
  fetchMock.get('begin:https://api.instagram.com', { data: [] });
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  fetchMock.restore();
});
