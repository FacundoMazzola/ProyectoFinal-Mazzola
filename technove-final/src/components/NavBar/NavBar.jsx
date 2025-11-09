// src/components/NavBar/NavBar.jsx
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

// Categorías del E-commerce TechnoVe
const categories = [
    { id: 'monitores', name: 'Monitores' },
    { id: 'perifericos', name: 'Periféricos' },
    { id: 'componentes', name: 'Componentes' }
];

const NavBar = () => {
    return (
        <header style={styles.header}>
            <Link to="/" style={styles.logoLink}>
                <h1 style={styles.logo}>TechnoVe ⚡</h1>
            </Link>

            <nav style={styles.nav}>
                {categories.map(cat => (
                    // NavLink se usa para resaltar la categoría activa
                    <NavLink 
                        key={cat.id} 
                        to={`/category/${cat.id}`} 
                        style={({ isActive }) => ({ ...styles.link, fontWeight: isActive ? 'bold' : 'normal', color: isActive ? '#61dafb' : 'white' })}
                    >
                        {cat.name}
                    </NavLink>
                ))}
            </nav>

            {/* Carrito en el extremo derecho */}
            <CartWidget />
        </header>
    );
};

// Estilos básicos para la barra de navegación
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 25px',
        backgroundColor: '#282c34', // Fondo oscuro
        color: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    },
    logoLink: {
        textDecoration: 'none'
    },
    logo: {
        fontSize: '2em',
        color: '#61dafb', // Color React brillante
        margin: 0
    },
    nav: {
        display: 'flex',
        gap: '25px'
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.1em',
        padding: '5px 0',
        transition: 'color 0.3s'
    }
};

export default NavBar;