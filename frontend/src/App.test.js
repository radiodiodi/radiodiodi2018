import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import App from './components/App';
import { WebSocket } from 'mock-socket';
import dotenv from 'dotenv';

global.WebSocket = WebSocket;
dotenv.config();

it('renders without crashing', () => {
  fetchMock.get('begin:https://api.instagram.com', { data: [] });
  fetchMock.get(`begin:${process.env.REACT_APP_BACKEND_HTTP_URL}/programmes`, { data: [] });
  fetchMock.get(`begin:${process.env.REACT_APP_BACKEND_HTTP_URL}/api/current_song`, {
    title: 'test', artist: 'test', duration: 100,
  });
  fetchMock.get(`begin:${process.env.REACT_APP_BACKEND_HTTP_URL}/now_playing`, {
    title: 'test', description: 'test', start: '2018-04-16T17:00:00+03:00', 
    end: '2018-04-16T19:00:00+03:00', team: 'PLK', genre: '', image: 'peltiradio.jpg',
  });

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  fetchMock.restore();
});
