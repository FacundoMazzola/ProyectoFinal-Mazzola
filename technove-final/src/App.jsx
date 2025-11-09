// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

// Importa los componentes de Contenedor (aún no creados, pero necesarios para las rutas)
// Nota: La importación de ItemListContainer, ItemDetailContainer y CartView se mantiene,
// aunque debemos crearlos a continuación.
import ItemListContainer from './containers/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import CartView from './containers/CartView/CartView';

function App() {
  return (
    // BrowserRouter permite usar el sistema de rutas
    <BrowserRouter>
      <NavBar /> {/* La barra de navegación se muestra en todas las páginas */}
      <Routes>
        {/* Ruta principal: Muestra todos los productos */}
        <Route 
          path="/" 
          element={<ItemListContainer greeting="Bienvenido a TechnoVe: Tu tienda de tecnología de confianza" />} 
        />
        
        {/* Ruta de categoría: Muestra productos filtrados por categoryId */}
        <Route 
          path="/category/:categoryId" 
          element={<ItemListContainer greeting="Explora la categoría" />} 
        />
        
        {/* Ruta de detalle: Muestra la información de un producto específico por itemId */}
        <Route 
          path="/item/:itemId" 
          element={<ItemDetailContainer />} 
        />
        
        {/* Ruta del carrito de compras */}
        <Route 
          path="/cart" 
          element={<CartView />} 
        />
        
        {/* Ruta de fallback para 404 (cualquier otra URL) */}
        <Route 
          path="*" 
          element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>404: Ruta No Encontrada en TechnoVe</h1>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
