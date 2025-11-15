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
    const [quantityAdded, setQuantityAdded] = useState(0); // cantidad añadida (solo para mostrar confirmación)

    const { itemId } = useParams();
    const { addToCart } = useCart(); // <- usar addToCart (coincide con CartContext)

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
                    setError("Producto no encontrado. El ID es inválido.");
                }
            })
            .catch(err => {
                console.error("Error al obtener detalle:", err);
                setError("Hubo un error al cargar los detalles del producto.");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [itemId]);

    // Cuando ItemCount llama onAdd
    const handleOnAdd = (quantity) => {
        if (product && quantity > 0) {
            // Enviamos al contexto un objeto con quantity incluido
            addToCart({
                id: product.id,
                name: product.name || product.title || 'Producto',
                price: Number(product.price) || 0,
                img: product.img || product.image || '',
                description: product.description || '',
                category: product.category || '',
                stock: product.stock || product.available || 0,
                quantity: quantity
            });

            // Guardamos cantidad añadida para mostrar confirmación, pero NO redirigimos automáticamente
            setQuantityAdded(quantity);
        }
    };

    if (loading) return <p style={styles.statusMessage}>Cargando detalles del producto... 🔍</p>;
    if (error) return <p style={{...styles.statusMessage, color: 'red'}}>⚠️ {error}</p>;
    if (!product) return null;

    return (
        <div style={styles.container}>
            <div style={styles.detailCard}>
                <img 
                    src={product.img || product.image} 
                    alt={product.name || product.title} 
                    style={styles.image} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/282c34/61dafb?text=Imagen+No+Disp.'; }}
                />
                <div style={styles.info}>
                    <h1 style={styles.title}>{product.name || product.title}</h1>
                    <p style={styles.price}>
                        Precio: ${Number(product.price || 0).toLocaleString('es-AR')}
                    </p>
                    <p style={styles.description}>{product.description}</p>
                    <p style={styles.category}>
                        Categoría: {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : '—'}
                    </p>

                    {/* Si ya agregaste algo mostramos confirmación con opciones, pero no redirigimos automáticamente */}
                    {quantityAdded > 0 ? (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '18px', alignItems: 'center' }}>
                            <div style={styles.addedBadge}>✔ Agregaste {quantityAdded}</div>

                            <Link to="/cart" style={styles.goToCartButton}>
                                Ir al Carrito
                            </Link>

                            <button
                                style={styles.continueButton}
                                onClick={() => setQuantityAdded(0)}
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        <ItemCount 
                            maxStock={product.stock || product.available || 99} 
                            onAdd={handleOnAdd} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    statusMessage: {
        textAlign: 'center',
        fontSize: '1.5em',
        marginTop: '50px'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#f9f9f9',
        minHeight: '85vh'
    },
    detailCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        width: '100%',
        overflow: 'hidden',
        gap: '30px',
        padding: '30px'
    },
    image: {
        width: '40%',
        minWidth: '350px',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '10px'
    },
    info: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: '3em',
        color: '#282c34',
        marginBottom: '10px'
    },
    price: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: '20px'
    },
    description: {
        fontSize: '1.1em',
        color: '#555',
        lineHeight: '1.6',
        marginBottom: '30px'
    },
    category: {
        fontSize: '1em',
        color: '#777',
        marginBottom: '30px'
    },
    goToCartButton: {
        backgroundColor: '#f57c00',
        color: 'white',
        textDecoration: 'none',
        padding: '10px 18px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '700'
    },
    continueButton: {
        background: 'transparent',
        border: '2px solid #f57c00',
        color: '#f57c00',
        padding: '8px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '700'
    },
    addedBadge: {
        background: '#e8f5e9',
        color: '#2e7d32',
        padding: '8px 12px',
        borderRadius: '8px',
        fontWeight: '700'
    }
};

export default ItemDetailContainer;
