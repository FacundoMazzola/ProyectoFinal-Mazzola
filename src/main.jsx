// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CartProvider envuelve toda la aplicación, dando acceso al carrito */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);