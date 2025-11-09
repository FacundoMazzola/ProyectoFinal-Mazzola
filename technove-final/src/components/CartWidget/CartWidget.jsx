// src/components/CartWidget/CartWidget.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartWidget = () => {
    // Obtiene la cantidad total del carrito desde el contexto
    const { totalQuantity } = useCart();

    // Si no hay ítems, no renderiza el componente
    if (totalQuantity === 0) return null;

    return (
        <Link to="/cart" style={styles.container}>
            {/* Icono de Carrito (usamos un emoji por simplicidad) */}
            <span style={styles.icon}>🛒</span>
            {/* Contador de ítems */}
            <span style={styles.counter}>
                {totalQuantity}
            </span>
        </Link>
    );
};

// Estilos básicos
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2em',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
        // Estilo de hover (invisible aquí, pero React lo aplicaría)
    },
    icon: {
        fontSize: '1.5em',
        marginRight: '5px'
    },
    counter: {
        backgroundColor: '#f57c00', // Naranja, para que destaque
        borderRadius: '50%',
        padding: '2px 8px',
        fontSize: '0.8em',
        lineHeight: 1
    }
};

export default CartWidget;