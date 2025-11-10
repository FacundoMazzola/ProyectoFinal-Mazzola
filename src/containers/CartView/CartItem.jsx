import { useCart } from '../../context/CartContext';

const CartItem = ({ product }) => {
    const { removeFromCart } = useCart();

    const subtotal = (Number(product.price) || 0) * (Number(product.quantity) || 0);

    return (
        <div style={styles.card}>
            <div style={styles.info}>
                <img
                    src={product.img || product.image || 'https://placehold.co/100x100?text=No+Image'}
                    alt={product.name}
                    style={styles.image}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x100/eee/888?text=Sin+Img';
                    }}
                />
                <div style={styles.details}>
                    <h3 style={styles.name}>{product.name}</h3>
                    <p style={styles.desc}>
                        {product.description?.length > 60
                            ? product.description.slice(0, 60) + '...'
                            : product.description || ''}
                    </p>
                    <p style={styles.price}>
                        Precio unitario:{' '}
                        <strong>
                            {product.price?.toLocaleString('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                            }) || '$0'}
                        </strong>
                    </p>
                </div>
            </div>

            <div style={styles.actions}>
                <span style={styles.qty}>Cantidad: <strong>{product.quantity}</strong></span>
                <span style={styles.subtotal}>
                    Subtotal:{' '}
                    <strong>
                        {subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </strong>
                </span>
                <button
                    onClick={() => removeFromCart(product.id)}
                    style={styles.removeButton}
                    title="Eliminar producto"
                >
                    ✖ Eliminar
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
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        padding: '15px 20px',
        marginBottom: '15px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#222',
        marginBottom: '5px',
    },
    desc: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '6px',
    },
    price: {
        fontSize: '0.95rem',
        color: '#333',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid #eee',
        flexWrap: 'wrap',
        gap: '10px',
    },
    qty: {
        fontSize: '0.95rem',
        color: '#333',
    },
    subtotal: {
        fontSize: '1rem',
        color: '#2e7d32',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#e53935',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
};

// Efecto hover dinámico
const hoverStyle = `
.cart-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
button:hover {
  filter: brightness(1.1);
}
`;

if (typeof document !== 'undefined' && !document.getElementById('cart-hover-style')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'cart-hover-style';
    styleTag.innerHTML = hoverStyle;
    document.head.appendChild(styleTag);
}

export default CartItem;
