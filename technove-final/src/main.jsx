// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Importamos el Proveedor del Contexto
import { CartProvider } from './context/CartContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CartProvider envuelve toda la aplicación, dando acceso al carrito */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);