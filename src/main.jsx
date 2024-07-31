import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import App from './App'
import './fonts/Roboto/Roboto-Regular.ttf';
import './fonts/Roboto/Roboto-Bold.ttf';
import './index.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './assets/theme';
import { Provider } from 'react-redux';
import { store } from './store';
  
const createApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store = { store }>
        <ThemeProvider theme={theme}>
          <HashRouter>
              <App />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

const isMovil = Boolean(window.cordova);
if (isMovil){
  document.addEventListener("deviceready", createApp, false);
} else {
  createApp();
}
