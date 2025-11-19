import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();

    const [buyer, setBuyer] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buyer.name || !buyer.phone || !buyer.email) {
            return alert("Completá todos los campos.");
        }

        setLoading(true);

        try {
            const id = await createOrder(buyer, cart, totalPrice);
            setOrderId(id);
            clearCart();
        } catch (error) {
            alert("Hubo un error al procesar la compra.");
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div style={styles.centered}>
                <h2>¡Compra realizada con éxito! 🎉</h2>
                <p>Tu código de orden es:</p>
                <h3 style={styles.orderId}>{orderId}</h3>

                <a href="/" style={styles.homeBtn}>Volver al inicio</a>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2>Finalizar compra</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={buyer.name}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={buyer.phone}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={buyer.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.btn} disabled={loading}>
                    {loading ? "Procesando..." : "Confirmar compra"}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    btn: {
        padding: "12px",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    centered: {
        textAlign: "center",
        marginTop: "50px",
    },
    orderId: {
        color: "#1976d2",
        fontSize: "1.6rem",
        marginTop: "10px",
    },
    homeBtn: {
        display: "inline-block",
        marginTop: "20px",
        padding: "10px 20px",
        background: "#4caf50",
        color: "white",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default Checkout;
