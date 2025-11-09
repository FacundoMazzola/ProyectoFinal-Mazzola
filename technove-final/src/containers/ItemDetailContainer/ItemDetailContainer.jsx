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
    const [quantityAdded, setQuantityAdded] = useState(0); // Estado para controlar si ya se agregó al carrito

    const { itemId } = useParams();
    const { addItem } = useCart(); // Función para agregar al carrito del CartContext

    useEffect(() => {
        setLoading(true);
        setProduct(null);
        setError(null);
        setQuantityAdded(0);

        // 1. Referencia al documento específico
        const docRef = doc(db, 'products', itemId);

        // 2. Obtener el documento de Firebase
        getDoc(docRef)
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    // Si existe, mapear los datos junto con el id
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

    // 💡 FUNCIÓN CLAVE: Se ejecuta cuando el ItemCount presiona "Agregar"
    const handleOnAdd = (quantity) => {
        if (product && quantity > 0) {
            addItem(product, quantity);
            setQuantityAdded(quantity); // Actualiza el estado para mostrar el botón de ir al carrito
        }
    };

    if (loading) return <p style={styles.statusMessage}>Cargando detalles del producto... 🔍</p>;
    if (error) return <p style={{...styles.statusMessage, color: 'red'}}>⚠️ {error}</p>;
    if (!product) return null;

    // Estructura de presentación del detalle
    return (
        <div style={styles.container}>
            <div style={styles.detailCard}>
                <img 
                    src={product.img} 
                    alt={product.name} 
                    style={styles.image} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/282c34/61dafb?text=Imagen+No+Disp.'; }}
                />
                <div style={styles.info}>
                    <h1 style={styles.title}>{product.name}</h1>
                    <p style={styles.price}>
                        Precio: ${product.price.toLocaleString('es-AR')}
                    </p>
                    <p style={styles.description}>{product.description}</p>
                    <p style={styles.category}>
                        Categoría: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>

                    {/* Lógica condicional: si ya se agregó, muestra el botón de ir al carrito */}
                    {quantityAdded > 0 ? (
                        <Link to="/cart" style={styles.goToCartButton}>
                            Ir al Carrito ({quantityAdded} ítems)
                        </Link>
                    ) : (
                        // Si aún no se agregó, muestra el contador para elegir cantidad
                        <ItemCount 
                            maxStock={product.stock} 
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
        backgroundColor: '#f57c00', // Naranja del carrito
        color: 'white',
        textDecoration: 'none',
        padding: '15px 30px',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginTop: 'auto',
        transition: 'background-color 0.3s'
    }
};

export default ItemDetailContainer;