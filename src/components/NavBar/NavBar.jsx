import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react'; // npm install lucide-react

const NavBar = () => {
    const { cart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const links = [
        { id: 'inicio', label: 'Inicio', path: '/' },
        { id: 'monitores', label: 'Monitores', path: '/category/monitores' },
        { id: 'perifericos', label: 'Periféricos', path: '/category/perifericos' },
    ];

    return (
        <header style={styles.header}>
            {/* LOGO */}
            <Link to="/" style={styles.logoLink}>
                <h1 style={styles.logo} className="logo-animated">TechNove ⚡</h1>
            </Link>

            {/* BOTÓN HAMBURGUESA (solo visible en móvil) */}
            <button style={styles.menuButton} onClick={toggleMenu}>
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav
                style={{
                    ...styles.nav,
                    ...(menuOpen ? styles.navOpen : {}),
                }}
            >
                {links.map(link => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        style={({ isActive }) => ({
                            ...styles.link,
                            color: isActive ? '#2e7d32' : '#333',
                            fontWeight: isActive ? '600' : '500',
                        })}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* CARRITO */}
            <Link to="/cart" style={styles.cartContainer}>
                <ShoppingCart size={26} color="#333" />
                {totalItems > 0 && (
                    <span style={styles.cartBadge}>{totalItems}</span>
                )}
            </Link>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#fff',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logoLink: {
        textDecoration: 'none',
    },
    logo: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#2e7d32',
        margin: 0,
        letterSpacing: '0.5px',
        transition: 'color 0.5s ease, text-shadow 0.3s ease',
    },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        color: '#333',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    navOpen: {
        position: 'absolute',
        top: '70px',
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        transform: 'translateY(0)',
        opacity: 1,
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.1rem',
        transition: 'color 0.3s ease',
    },
    cartContainer: {
        position: 'relative',
        textDecoration: 'none',
        color: '#333',
    },
    cartBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-10px',
        backgroundColor: '#2e7d32',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 1.5s infinite',
    },
};

// ✨ CSS adicional
const extraCSS = `
@media (max-width: 768px) {
  nav {
    display: none;
  }
  button {
    display: block !important;
  }
  nav[style*="flex-direction: column"] {
    display: flex !important;
  }
}

/* Hover y efectos visuales */
a:hover {
  color: #2e7d32 !important;
}

/* Efecto de "latido" en el contador */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Logo con animación mágica */
.logo-animated:hover {
  color: #1976d2 !important;
  text-shadow: 0 0 8px rgba(33, 150, 243, 0.6);
}
`;

if (typeof document !== 'undefined' && !document.getElementById('navbar-style-final')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'navbar-style-final';
    styleTag.innerHTML = extraCSS;
    document.head.appendChild(styleTag);
}

export default NavBar;
