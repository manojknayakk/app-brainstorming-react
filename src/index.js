import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './store.js';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '50px',
  transition: transitions.FADE,
  error: 'error'
}

ReactDOM.render(
  <StateProvider>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </StateProvider>
  , document.getElementById('root'));

serviceWorker.unregister();
