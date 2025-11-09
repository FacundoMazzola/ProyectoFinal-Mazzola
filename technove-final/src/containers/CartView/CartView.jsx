// src/containers/CartView/CartView.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import CartItem from './CartItem';

const CartView = () => {
    // 1. Contexto: Obtener datos y funciones del carrito
    const { cart, totalPrice, clearCart } = useCart();
    
    // 2. Estados para el formulario y el ID de la orden
    const [buyerData, setBuyerData] = useState({ name: '', phone: '', email: '' });
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Si el carrito está vacío y no hay orden ID, mostramos mensaje
    if (cart.length === 0 && !orderId) {
        return (
            <div style={styles.emptyCartContainer}>
                <h1 style={styles.emptyCartTitle}>Tu carrito está vacío 😔</h1>
                <p style={styles.emptyCartText}>¡Parece que aún no has agregado productos!</p>
                <Link to="/" style={styles.goShoppingButton}>
                    Volver a Comprar
                </Link>
            </div>
        );
    }
    
    // Si la orden se generó con éxito
    if (orderId) {
        return (
            <div style={styles.orderSuccessContainer}>
                <h1 style={styles.orderSuccessTitle}>🎉 ¡Compra Finalizada con Éxito! 🎉</h1>
                <p style={styles.orderSuccessText}>
                    Tu orden ha sido registrada. Pronto nos pondremos en contacto contigo.
                </p>
                <p style={styles.orderIdDisplay}>
                    ID de tu Orden: <strong>{orderId}</strong>
                </p>
                <Link to="/" style={styles.goShoppingButton}>
                    Volver al Catálogo
                </Link>
            </div>
        );
    }

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
    };

    // 💡 FUNCIÓN CLAVE: Generar la orden de compra en Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validar que los campos no estén vacíos
        if (!buyerData.name || !buyerData.phone || !buyerData.email) {
            // Nota: En una app real, usarías un modal o un toast, no alert.
            // Aquí lo dejamos simple para el ejemplo
            console.error('Por favor, completa todos los campos del formulario.');
            setLoading(false);
            return;
        }

        const newOrder = {
            buyer: buyerData,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: totalPrice,
            date: serverTimestamp() // Marca de tiempo de Firebase
        };

        try {
            // 1. Subir la nueva orden a la colección 'orders'
            const ordersRef = collection(db, 'orders');
            const docRef = await addDoc(ordersRef, newOrder);
            
            // 2. Guardar el ID de la orden
            setOrderId(docRef.id);
            
            // 3. Limpiar el carrito
            clearCart();
            
        } catch (error) {
            console.error("Error al generar la orden:", error);
            // Mostrar un modal o mensaje de error al usuario (en lugar de alert)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🛒 Resumen de tu Carrito</h1>
            
            <div style={styles.grid}>
                {/* Columna Izquierda: Listado de Productos */}
                <div style={styles.cartList}>
                    {/* Encabezado de la lista */}
                    <div style={{...styles.itemRow, borderBottom: '2px solid #ddd', fontWeight: 'bold', fontSize: '1.2em'}}>
                        <span style={{width: '40%'}}>Producto</span>
                        <span style={{width: '10%', textAlign: 'center'}}>Cant.</span>
                        <span style={{width: '15%', textAlign: 'right'}}>Precio Unit.</span>
                        <span style={{width: '15%', textAlign: 'right'}}>Subtotal</span>
                        <span style={{width: '5%'}}></span>
                    </div>

                    {/* Mapeo de items */}
                    {cart.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                    
                    <div style={styles.totalRow}>
                        <span>Total Final:</span>
                        <span style={styles.totalPrice}>${totalPrice.toLocaleString('es-AR')}</span>
                    </div>
                    <button 
                        onClick={clearCart} 
                        style={styles.clearCartButton}
                    >
                        Vaciar Carrito
                    </button>
                </div>

                {/* Columna Derecha: Formulario de Checkout */}
                <div style={styles.checkoutForm}>
                    <h2 style={styles.formTitle}>Datos del Comprador</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Nombre y Apellido" 
                            value={buyerData.name} 
                            onChange={handleChange} 
                            style={styles.input} 
                            required
                        />
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Teléfono (ej: 1122334455)" 
                            value={buyerData.phone} 
                            onChange={handleChange} 
                            style={styles.input} 
                            required
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={buyerData.email} 
                            onChange={handleChange} 
                            style={styles.input} 
                            required
                        />
                        
                        <button 
                            type="submit" 
                            style={styles.checkoutButton}
                            disabled={loading}
                        >
                            {loading ? 'Procesando Compra...' : 'Finalizar Compra'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Estilos ---
const baseButton = {
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
};

const styles = {
    container: {
        padding: '40px',
        backgroundColor: '#f0f2f5',
        minHeight: '85vh'
    },
    title: {
        textAlign: 'center',
        fontSize: '3em',
        color: '#282c34',
        marginBottom: '40px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr', // Carrito más grande que el formulario
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        '@media (max-width: 900px)': {
            gridTemplateColumns: '1fr', // Columnas apiladas en móvil/tablet
        }
    },
    cartList: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    itemRow: { // Reutilizado para encabezado
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: '2px dashed #ddd',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#282c34'
    },
    totalPrice: {
        color: '#f57c00' // Naranja
    },
    clearCartButton: {
        ...baseButton,
        backgroundColor: '#e53935', // Rojo para vaciar
        color: 'white',
        width: '100%',
        marginTop: '20px',
    },
    checkoutForm: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
    },
    formTitle: {
        fontSize: '1.8em',
        color: '#282c34',
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1em'
    },
    checkoutButton: {
        ...baseButton,
        backgroundColor: '#4CAF50', // Verde para finalizar
        color: 'white',
        width: '100%',
        marginTop: '10px'
    },
    // Estilos de Carrito Vacío
    emptyCartContainer: {
        textAlign: 'center',
        padding: '100px 20px',
        backgroundColor: '#f0f2f5',
        minHeight: '85vh'
    },
    emptyCartTitle: {
        fontSize: '3em',
        color: '#333'
    },
    emptyCartText: {
        fontSize: '1.2em',
        color: '#777',
        marginBottom: '40px'
    },
    goShoppingButton: {
        ...baseButton,
        backgroundColor: '#61dafb',
        color: '#282c34',
        textDecoration: 'none',
        display: 'inline-block',
    },
    // Estilos de Compra Exitosa
    orderSuccessContainer: {
        textAlign: 'center',
        padding: '100px 20px',
        backgroundColor: '#e8f5e9', // Fondo verde muy claro
        borderRadius: '15px',
        margin: '50px auto',
        maxWidth: '600px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    orderSuccessTitle: {
        fontSize: '2.5em',
        color: '#4CAF50'
    },
    orderSuccessText: {
        fontSize: '1.1em',
        color: '#333',
        marginBottom: '30px'
    },
    orderIdDisplay: {
        fontSize: '1.5em',
        color: '#f57c00',
        marginBottom: '40px'
    }
};

export default CartView;