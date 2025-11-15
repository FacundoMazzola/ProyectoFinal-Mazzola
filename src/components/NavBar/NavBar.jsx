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
                <h1 style={styles.logo} className="logo-animated">TechNove ⚡</h1>
            </Link>

            {/* BOTÓN HAMBURGUESA */}
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
        background: 'rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.4)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logoLink: {
        textDecoration: 'none',
    },
    logo: {
        fontSize: '1.9rem',
        fontWeight: '800',
        color: '#2e7d32',
        margin: 0,
        letterSpacing: '1px',
        textShadow: '0 0 6px rgba(46, 125, 50, 0.4)',
        transition: '0.4s ease',
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
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(14px)',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transform: 'translateY(0)',
        opacity: 1,
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.15rem',
        fontWeight: '500',
        padding: '6px 10px',
        borderRadius: '8px',
        transition: '0.3s ease',
    },
    cartContainer: {
        position: 'relative',
        textDecoration: 'none',
        color: '#333',
        padding: '5px',
        borderRadius: '10px',
        transition: '0.3s',
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
        boxShadow: '0 0 6px rgba(46, 125, 50, 0.7)',
    },
};

/* ------------------------------
   CSS Adicional
-------------------------------- */
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

/* LINKS con efecto brillante */
nav a {
  transition: 0.3s ease;
}
nav a:hover {
  color: #2e7d32 !important;
  text-shadow: 0 0 8px rgba(0,255,120,0.6);
  transform: translateY(-2px);
}

/* Carrito hover */
a[href="/cart"]:hover {
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(46, 125, 50, 0.5);
}

/* Efecto pulse */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* Logo más brillante */
.logo-animated:hover {
  color: #1e90ff !important;
  text-shadow: 0 0 12px rgba(30, 144, 255, 0.8),
               0 0 20px rgba(30, 144, 255, 0.6);
  transform: scale(1.05);
}
`;

if (typeof document !== 'undefined' && !document.getElementById('navbar-style-glossy')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'navbar-style-glossy';
    styleTag.innerHTML = extraCSS;
    document.head.appendChild(styleTag);
}

export default NavBar;
