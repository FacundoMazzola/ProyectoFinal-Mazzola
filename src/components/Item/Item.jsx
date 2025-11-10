// src/containers/ItemListContainer/Item.jsx
import { Link, useNavigate } from 'react-router-dom'; // 👈 Agrega useNavigate
// ❗️ IMPORTANTE: Reemplaza './CartContext' con la ruta real a tu archivo de contexto
import { useCartContext } from '../../context/CartContext';

const Item = ({ product }) => {
    // Inicializa los hooks:
    const navigate = useNavigate();
    const { addItem } = useCartContext(); // Asume que tienes un hook para tu contexto

    // FUNCIÓN QUE MANEJA LA COMPRA Y REDIRECCIÓN
    const handleAddToCart = () => {
        // 1. AGREGA el producto al carrito (cantidad por defecto 1)
        addItem(product, 1);

        // 2. REDIRIGE al usuario a la vista del carrito
        navigate('/cart');
    };

    return (
        <div style={styles.card}>
            {/* ... (código anterior) ... */}
            <p style={styles.description}>{product.description}</p>

            <div style={styles.buttons}>
                <Link to={`/item/${product.id}`} style={styles.detailButton}>
                    Ver Detalle
                </Link>
                {/* 3. ASIGNA la función handleAddToCart al botón */}
                <button
                    style={styles.buyButton}
                    onClick={handleAddToCart} // 👈 ¡CLAVE!
                >
                    🛒 Comprar (ir al carrito)
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        width: '280px',
        margin: '15px',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'contain',
        marginBottom: '10px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    price: {
        fontSize: '1.4rem',
        color: '#007600',
        marginBottom: '10px',
    },
    description: {
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: '15px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    detailButton: {
        backgroundColor: '#0077ff',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '0.9rem',
    },
    buyButton: {
        backgroundColor: '#00c853',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
};

export default Item;
