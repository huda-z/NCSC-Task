import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter } from 'react-router-dom';
import App from "./App";
import ContextProvider from "./component/context/ContextProvider";
// import { StrictMode } from 'react';


ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
  ,
  document.getElementById('root')
);

