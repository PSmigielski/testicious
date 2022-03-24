import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './contexts/CartContext';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
