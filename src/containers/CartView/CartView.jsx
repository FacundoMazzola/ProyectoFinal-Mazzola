// src/containers/CartView/CartView.jsx

import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import CartItem from './CartItem';

const CartView = () => {
    const { cart, totalPrice, clearCart } = useCart();

    const [buyerData, setBuyerData] = useState({
        name: "",
        phone: "",
        email: "",
    });

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
            setError("Por favor completá todos los campos del formulario.");
            setLoading(false);
            return;
        }

        if (cart.length === 0) {
            setError("Tu carrito está vacío.");
            setLoading(false);
            return;
        }

        // 🚀 SANITIZACIÓN COMPLETA – evita undefined en Firebase
        const sanitizedItems = cart.map(item => ({
            id: item.id ?? "sin-id",
            name: item.name ?? "Producto sin nombre",
            price: Number(item.price ?? 0),
            quantity: Number(item.quantity ?? 1),
            img: item.img ?? "",
            description: item.description ?? "",
            category: item.category ?? "",
            stock: Number(item.stock ?? 0),
        }));

        const order = {
            buyer: {
                name: buyerData.name?.trim() ?? "",
                phone: buyerData.phone?.trim() ?? "",
                email: buyerData.email?.trim() ?? "",
            },
            items: sanitizedItems,
            total: Number(totalPrice ?? 0),
            date: serverTimestamp(),
        };

        try {
            const ordersRef = collection(db, "orders");
            const res = await addDoc(ordersRef, order);
            setOrderId(res.id);
            clearCart();
        } catch (err) {
            console.error("Error al generar la orden:", err);
            setError("Hubo un error generando la orden. Intentá nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // -------------------------
    // VIEWS
    // -------------------------

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
                <h1 style={styles.successTitle}>🎉 ¡Compra realizada!</h1>
                <p style={styles.successText}>Gracias por tu compra, {buyerData.name || "cliente"}.</p>
                <p>ID de tu orden:</p>
                <h3 style={styles.orderId}>{orderId}</h3>
                <Link to="/" style={styles.primaryButton}>Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* LISTA DEL CARRITO */}
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
                        {Number(totalPrice).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                        })}
                    </strong>
                </div>

                <button onClick={clearCart} style={styles.dangerButton}>
                    Vaciar carrito
                </button>
            </div>

            {/* FORMULARIO DE COMPRA */}
            <div style={styles.checkoutSection}>
                <h2 style={styles.subtitle}>Datos del comprador</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre y Apellido"
                        value={buyerData.name}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
                        value={buyerData.phone}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={buyerData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    {error && <p style={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        style={styles.primaryButton}
                        disabled={loading}
                    >
                        {loading ? "Procesando..." : "Finalizar compra"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// ----------------------
// ESTILOS
// ----------------------
const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px",
        padding: "50px 20px",
        backgroundColor: "#f5f7fa",
    },
    cartSection: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        width: "650px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    checkoutSection: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        width: "350px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
        borderBottom: "2px solid #eee",
        paddingBottom: "10px",
    },
    subtitle: {
        fontSize: "1.3rem",
        marginBottom: "20px",
    },
    items: {},
    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        fontSize: "1.3rem",
    },
    totalPrice: {
        color: "#2e7d32",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
    },
    primaryButton: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        padding: "12px 20px",
        width: "100%",
        borderRadius: "8px",
        display: "inline-block",
        textAlign: "center",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
    },
    dangerButton: {
        backgroundColor: "#e53935",
        color: "#fff",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "20px",
    },
    emptyCart: {
        textAlign: "center",
        padding: "80px 20px",
    },
    successContainer: {
        textAlign: "center",
        padding: "80px 20px",
    },
    successTitle: {
        fontSize: "2rem",
        color: "#2e7d32",
    },
    successText: {
        fontSize: "1.1rem",
    },
    orderId: {
        fontSize: "1.3rem",
        color: "#ff9800",
        margin: "10px 0",
    },
    error: {
        color: "#e53935",
    },
};

export default CartView;
