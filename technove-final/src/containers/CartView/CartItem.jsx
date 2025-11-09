// src/containers/CartView/CartItem.jsx
import { useCart } from '../../context/CartContext';

// Muestra la información de un producto dentro de la lista del carrito
const CartItem = ({ product }) => {
    // Obtenemos la función para eliminar un ítem del carrito
    const { removeItem } = useCart();

    const subtotal = product.price * product.quantity;

    return (
        <div style={styles.itemRow}>
            <div style={styles.productInfo}>
                <img
                    src={product.img}
                    alt={product.name}
                    style={styles.image}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/282c34/61dafb?text=Img'; }}
                />
                <span style={styles.name}>{product.name}</span>
            </div>

            <span style={styles.quantity}>x {product.quantity}</span>
            <span style={styles.price}>${product.price.toLocaleString('es-AR')}</span>
            <span style={styles.subtotal}>${subtotal.toLocaleString('es-AR')}</span>

            <button
                onClick={() => removeItem(product.id)}
                style={styles.removeButton}
                title="Eliminar producto"
            >
                ❌
            </button>
        </div>
    );
};

const styles = {
    itemRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        padding: '15px 0',
        fontSize: '1.1em'
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
        width: '40%',
    },
    image: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginRight: '15px'
    },
    name: {
        fontWeight: 'bold',
        color: '#282c34'
    },
    quantity: {
        width: '10%',
        textAlign: 'center',
        color: '#555'
    },
    price: {
        width: '15%',
        textAlign: 'right',
        color: '#777'
    },
    subtotal: {
        width: '15%',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#4CAF50'
    },
    removeButton: {
        width: '5%',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2em'
    }
};

export default CartItem;