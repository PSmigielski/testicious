import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './contexts/CartContext';
import Router from './Router';
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL)
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
