import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/**
 * Main application entry point for the StadiumFlow PWA.
 * @complexity O(1) for standard React render initialization.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
