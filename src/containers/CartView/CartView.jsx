import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import CartItem from './CartItem';

const CartView = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const [buyerData, setBuyerData] = useState({ name: '', phone: '', email: '' });
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!buyerData.name || !buyerData.phone || !buyerData.email) {
            setError("Por favor, completá todos los campos del formulario.");
            setLoading(false);
            return;
        }

        if (cart.length === 0) {
            setError("Tu carrito está vacío.");
            setLoading(false);
            return;
        }

        const sanitizedItems = cart.map(item => ({
            id: item.id || "sin-id",
            name: item.name || "Producto sin nombre",
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1
        }));

        const newOrder = {
            buyer: {
                name: buyerData.name.trim(),
                phone: buyerData.phone.trim(),
                email: buyerData.email.trim(),
            },
            items: sanitizedItems,
            total: Number(totalPrice) || 0,
            date: serverTimestamp(),
        };

        try {
            const ordersRef = collection(db, 'orders');
            const docRef = await addDoc(ordersRef, newOrder);
            setOrderId(docRef.id);
            clearCart();
        } catch (err) {
            console.error("Error al generar la orden:", err);
            setError("Hubo un error al generar la orden. Intentalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !orderId) {
        return (
            <div style={styles.emptyCart}>
                <h2>Tu carrito está vacío 😔</h2>
                <Link to="/" style={styles.primaryButton}>Volver a comprar</Link>
            </div>
        );
    }

    if (orderId) {
        return (
            <div style={styles.successContainer}>
                <h1 style={styles.successTitle}>🎉 ¡Compra finalizada!</h1>
                <p style={styles.successText}>Gracias por tu compra, {buyerData.name || "cliente"}.</p>
                <p>ID de tu orden:</p>
                <h3 style={styles.orderId}>{orderId}</h3>
                <Link to="/" style={styles.primaryButton}>Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.cartSection}>
                <h1 style={styles.title}>🛒 Tu carrito</h1>
                <div style={styles.items}>
                    {cart.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div>

                <div style={styles.totalRow}>
                    <span>Total Final:</span>
                    <strong style={styles.totalPrice}>
                        {totalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </strong>
                </div>

                <button onClick={clearCart} style={styles.dangerButton}>
                    Vaciar carrito
                </button>
            </div>

            <div style={styles.checkoutSection}>
                <h2 style={styles.subtitle}>Datos del comprador</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Nombre y Apellido"
                        value={buyerData.name} onChange={handleChange} style={styles.input} />
                    <input type="tel" name="phone" placeholder="Teléfono"
                        value={buyerData.phone} onChange={handleChange} style={styles.input} />
                    <input type="email" name="email" placeholder="Correo electrónico"
                        value={buyerData.email} onChange={handleChange} style={styles.input} />

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.primaryButton} disabled={loading}>
                        {loading ? "Procesando..." : "Finalizar compra"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '40px',
        backgroundColor: '#f5f7fa',
        padding: '50px 20px',
        minHeight: '100vh',
    },
    cartSection: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '650px',
        maxWidth: '100%',
    },
    checkoutSection: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '350px',
        maxWidth: '100%',
    },
    title: {
        fontSize: '2rem',
        color: '#222',
        marginBottom: '25px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
    },
    subtitle: {
        fontSize: '1.3rem',
        marginBottom: '20px',
        color: '#333',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginTop: '25px',
        borderTop: '2px dashed #ddd',
        paddingTop: '15px',
    },
    totalPrice: {
        color: '#2e7d32',
    },
    input: {
        width: '100%',
        padding: '12px 14px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '10px',
        fontSize: '1rem',
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px',
        textDecoration: 'none',
        textAlign: 'center',
        display: 'inline-block',
    },
    dangerButton: {
        backgroundColor: '#e53935',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        width: '100%',
        marginTop: '20px',
    },
    error: {
        color: '#e53935',
        marginBottom: '10px',
    },
    emptyCart: {
        textAlign: 'center',
        padding: '100px 20px',
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
    },
    successContainer: {
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: '#e8f5e9',
        borderRadius: '16px',
        margin: '60px auto',
        width: '500px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    successTitle: {
        fontSize: '2rem',
        color: '#2e7d32',
        marginBottom: '15px',
    },
    successText: {
        fontSize: '1.1rem',
        color: '#333',
        marginBottom: '20px',
    },
    orderId: {
        color: '#ff9800',
    },
};

export default CartView;
