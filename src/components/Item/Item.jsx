// src/components/Item/Item.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Item = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const safeItem = {
            id: product.id,
            name: product.name ?? product.title ?? "Producto sin nombre",
            price: Number(product.price ?? 0),
            image: product.image ?? product.img ?? "",
            description: product.description ?? "",
            category: product.category ?? "",
            stock: Number(product.stock ?? 0),
            quantity: 1
        };

        addToCart(safeItem);
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img
                    src={product.image || product.img || 'https://via.placeholder.com/250'}
                    alt={product.name || product.title}
                    style={styles.image}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/250';
                    }}
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

export default Item;
