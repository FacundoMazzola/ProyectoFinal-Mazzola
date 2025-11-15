import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

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
                <h1 style={styles.logo} className="logo-animated">TechNove</h1>
            </Link>

            {/* BOTÓN HAMBURGUESA */}
            <button style={styles.menuButton} onClick={toggleMenu}>
                {menuOpen ? <X size={26} color="#fff" /> : <Menu size={26} color="#fff" />}
            </button>

            {/* MENÚ */}
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
                            color: isActive ? '#00e676' : '#ffffff',
                            borderBottom: isActive ? '2px solid #00e676' : '2px solid transparent'
                        })}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* CARRITO */}
            <Link to="/cart" style={styles.cartContainer}>
                <ShoppingCart size={26} color="#fff" />
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
        background: '#000000',
        borderBottom: '2px solid #1f1f1f',
        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: '"Segoe UI", Roboto, sans-serif',
    },
    logoLink: {
        textDecoration: 'none',
    },
    logo: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#ffffff',
        margin: 0,
        letterSpacing: '1px',
        transition: '0.3s ease',
    },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        transition: '0.3s ease',
    },
    navOpen: {
        position: 'absolute',
        top: '70px',
        left: 0,
        width: '100%',
        background: '#000',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.15rem',
        paddingBottom: '4px',
        transition: '0.3s ease',
    },
    cartContainer: {
        position: 'relative',
        textDecoration: 'none',
        padding: '6px',
        borderRadius: '8px',
        transition: '0.3s ease',
    },
    cartBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-10px',
        backgroundColor: '#00e676',
        color: '#000',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px #00e676',
    },
};

// CSS adicional
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

nav a:hover {
  color: #00e676 !important;
  border-bottom: 2px solid #00e676 !important;
}

.logo-animated:hover {
  letter-spacing: 2px;
  color: #00e676 !important;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('navbar-style-dark-professional')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'navbar-style-dark-professional';
    styleTag.innerHTML = extraCSS;
    document.head.appendChild(styleTag);
}

export default NavBar;
