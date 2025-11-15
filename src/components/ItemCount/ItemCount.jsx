// src/containers/ItemDetailContainer/ItemDetailContainer.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig';
import { useCart } from '../../context/CartContext';
import ItemCount from '../../components/ItemCount/ItemCount';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantityAdded, setQuantityAdded] = useState(0);

    const { itemId } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        setProduct(null);
        setError(null);
        setQuantityAdded(0);

        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    setError("Producto no encontrado.");
                }
            })
            .catch(() => setError("Error al cargar el producto."))
            .finally(() => setLoading(false));
    }, [itemId]);

    const handleOnAdd = (quantity) => {
        if (!product) return;

        addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            img: product.img || product.image || "",
            description: product.description || "",
            stock: Number(product.stock) || 0,
            quantity
        });

        setQuantityAdded(quantity);
    };

    if (loading) return <p style={styles.status}>Cargando...</p>;
    if (error) return <p style={{ ...styles.status, color: "red" }}>{error}</p>;
    if (!product) return null;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src={product.img || product.image}
                    alt={product.name}
                    style={styles.image}
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Sin+Imagen'; }}
                />

                <div style={styles.info}>
                    <h1 style={styles.title}>{product.name}</h1>

                    <p style={styles.price}>
                        {Number(product.price).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS'
                        })}
                    </p>

                    <p style={styles.description}>{product.description}</p>

                    <p style={styles.category}>
                        Categoría: {product.category || 'Sin categoría'}
                    </p>

                    <ItemCount
                        maxStock={product.stock}
                        onAdd={handleOnAdd}
                    />

                    {quantityAdded > 0 && (
                        <div style={styles.feedback}>
                            <span style={styles.notice}>
                                ✔ Agregaste {quantityAdded}
                            </span>

                            <Link to="/cart" style={styles.cartButton}>
                                Ir al carrito
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    status: {
        textAlign: "center",
        fontSize: "1.3rem",
        marginTop: "50px"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: "#f9f9f9"
    },
    card: {
        display: "flex",
        gap: "30px",
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "1000px",
        width: "100%",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    },
    image: {
        width: "40%",
        minWidth: "330px",
        borderRadius: "10px",
        objectFit: "cover"
    },
    info: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: "2.8rem",
        marginBottom: "10px",
        color: "#222"
    },
    price: {
        fontSize: "2rem",
        fontWeight: "700",
        color: "#4CAF50",
        marginBottom: "20px"
    },
    description: {
        fontSize: "1.1rem",
        color: "#444",
        marginBottom: "20px"
    },
    category: {
        fontSize: "1rem",
        color: "#777",
        marginBottom: "25px"
    },
    feedback: {
        marginTop: "20px",
        display: "flex",
        gap: "12px",
        alignItems: "center"
    },
    notice: {
        background: "#e8f5e9",
        color: "#2e7d32",
        padding: "10px 15px",
        borderRadius: "8px",
        fontWeight: "600"
    },
    cartButton: {
        backgroundColor: "#f57c00",
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        fontWeight: "600",
        textDecoration: "none"
    }
};

export default ItemDetailContainer;
