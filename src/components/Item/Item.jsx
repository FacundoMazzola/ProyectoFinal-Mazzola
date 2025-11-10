// src/containers/ItemListContainer/Item.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Item = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Agrega cantidad por defecto
    const handleAddToCart = () => {
        const itemWithQuantity = { ...product, quantity: 1 };
        addToCart(itemWithQuantity);
        navigate('/cart');
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img
                    src={product.image || 'https://via.placeholder.com/250'}
                    alt={product.name}
                    style={styles.image}
                />
            </div>

            <div style={styles.info}>
                <h3 style={styles.title}>{product.name}</h3>
                <p style={styles.description}>
                    {product.description?.length > 80
                        ? product.description.slice(0, 80) + '...'
                        : product.description}
                </p>

                <div style={styles.priceSection}>
                    <span style={styles.price}>
                        {product.price?.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                        }) || '$0'}
                    </span>
                    {product.discount && (
                        <span style={styles.discount}>-{product.discount}%</span>
                    )}
                </div>
            </div>

            <div style={styles.actions}>
                <Link to={`/item/${product.id}`} style={styles.detailButton}>
                    Ver detalle
                </Link>
                <button onClick={handleAddToCart} style={styles.addButton}>
                    🛒 Agregar
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        padding: '20px',
        width: '280px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        margin: '15px',
    },
    imageContainer: {
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '10px',
    },
    info: {
        textAlign: 'left',
        marginBottom: '15px',
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#222',
        marginBottom: '6px',
    },
    description: {
        fontSize: '0.9rem',
        color: '#666',
        lineHeight: '1.3em',
        marginBottom: '10px',
    },
    priceSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    price: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#007600',
    },
    discount: {
        backgroundColor: '#e53935',
        color: 'white',
        padding: '3px 8px',
        borderRadius: '5px',
        fontSize: '0.8rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
    },
    detailButton: {
        flex: 1,
        backgroundColor: '#1976d2',
        color: 'white',
        textDecoration: 'none',
        padding: '10px 0',
        borderRadius: '8px',
        fontSize: '0.95rem',
        textAlign: 'center',
        marginRight: '10px',
        transition: 'background-color 0.2s ease',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#2e7d32',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.95rem',
        padding: '10px 0',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
};

// Efectos hover (agregá este bloque al final del archivo si usás CSS global)
const hoverStyle = `
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
button:hover, a:hover {
    filter: brightness(1.1);
}
`;

// Injectamos el estilo hover al documento
if (typeof document !== 'undefined' && !document.getElementById('item-hover-style')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'item-hover-style';
    styleTag.innerHTML = hoverStyle;
    document.head.appendChild(styleTag);
}

export default Item;
