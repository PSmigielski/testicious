import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './contexts/CartContext';
import Router from './Router';
import axios from "axios";
import { AuthProvider } from './contexts/AuthContext';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
