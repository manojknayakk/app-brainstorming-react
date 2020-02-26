import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './store.js';

ReactDOM.render(
  <StateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>
  , document.getElementById('root'));

serviceWorker.unregister();
