import { useCart } from '../../context/CartContext';

const CartItem = ({ product }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    // 🚀 Sanitización completa
    const safeProduct = {
        id: product.id ?? "sin-id",
        name: product.name ?? "Producto",
        image: product.image ?? product.img ?? "",
        description: product.description ?? "",
        price: Number(product.price ?? 0),
        quantity: Number(product.quantity ?? 1),
    };

    const subtotal = safeProduct.price * safeProduct.quantity;

    return (
        <div style={styles.card} className="cart-card">
            <div style={styles.info}>
                <img
                    src={
                        safeProduct.image ||
                        'https://placehold.co/100x100?text=No+Image'
                    }
                    alt={safeProduct.name}
                    style={styles.image}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x100/eee/888?text=Sin+Img';
                    }}
                />

                <div style={styles.details}>
                    <h3 style={styles.name}>{safeProduct.name}</h3>

                    <p style={styles.desc}>
                        {safeProduct.description.length > 60
                            ? safeProduct.description.slice(0, 60) + '...'
                            : safeProduct.description}
                    </p>

                    <p style={styles.price}>
                        Precio unitario:{' '}
                        <strong>
                            {safeProduct.price.toLocaleString('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                            })}
                        </strong>
                    </p>
                </div>
            </div>

            <div style={styles.actions}>

                {/* Botones de cantidad */}
                <div style={styles.quantityBox}>
                    <button
                        style={styles.qtyButton}
                        onClick={() => decreaseQuantity(safeProduct.id)}
                    >
                        -
                    </button>

                    <span style={styles.qtyNumber}>
                        {safeProduct.quantity}
                    </span>

                    <button
                        style={styles.qtyButton}
                        onClick={() => increaseQuantity(safeProduct.id)}
                    >
                        +
                    </button>
                </div>

                {/* Subtotal */}
                <span style={styles.subtotal}>
                    Subtotal:{' '}
                    <strong>
                        {subtotal.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                        })}
                    </strong>
                </span>

                {/* Eliminar */}
                <button
                    onClick={() => removeFromCart(safeProduct.id)}
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
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        padding: '15px 20px',
        marginBottom: '15px',
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
    },
    desc: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '6px',
    },
    price: {
        fontSize: '0.95rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid #eee',
        gap: '15px',
        flexWrap: 'wrap',
    },
    quantityBox: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #ccc',
        overflow: 'hidden',
    },
    qtyButton: {
        background: '#f0f0f0',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
    },
    qtyNumber: {
        padding: '6px 15px',
        fontSize: '1rem',
        fontWeight: '600',
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
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

/* Hover */
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

