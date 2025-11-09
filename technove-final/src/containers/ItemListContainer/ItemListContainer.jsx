// src/containers/ItemListContainer/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../api/firebaseConfig'; // Importa la instancia de Firestore
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
    // Estados para manejar los datos, la carga y el error
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Captura el parámetro 'categoryId' de la URL (si existe)
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);
        setProducts([]); // Limpiar productos anteriores

        // 1. Referencia a la colección 'products'
        const productsRef = collection(db, 'products');
        
        // 2. Definición del Query (Consulta)
        let q = productsRef;

        // Si existe un categoryId, se aplica el filtro
        // Nota: Se asume que el campo en Firestore es 'category'
        if (categoryId) {
            q = query(productsRef, where('category', '==', categoryId));
        }
        
        // 3. Obtener los documentos de Firestore
        getDocs(q)
            .then(snapshot => {
                if (snapshot.empty) {
                    setError(`No se encontraron productos en la categoría: ${categoryId || 'Todos'}`);
                    return;
                }
                
                // Mapear los documentos a un array de productos con su id
                const productsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setProducts(productsData);
            })
            .catch(err => {
                console.error("Error al obtener productos:", err);
                setError("Hubo un error al cargar los productos. Intenta de nuevo.");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [categoryId]); // Se vuelve a ejecutar cada vez que cambia la categoría

    return (
        <main style={styles.main}>
            <h2 style={styles.greeting}>{greeting} {categoryId ? `(${categoryId.toUpperCase()})` : 'Catálogo Completo'}</h2>

            {loading && <p style={styles.statusMessage}>Cargando productos... 🔄</p>}
            
            {error && <p style={{ ...styles.statusMessage, ...styles.error }}>⚠️ {error}</p>}
            
            {/* Si no hay error ni carga, se muestra el listado */}
            {!loading && !error && products.length > 0 && (
                <ItemList products={products} />
            )}
            
            {!loading && !error && products.length === 0 && (
                <p style={styles.statusMessage}>No hay productos disponibles en esta sección.</p>
            )}
        </main>
    );
};

const styles = {
    main: {
        textAlign: 'center',
        padding: '20px',
        minHeight: 'calc(100vh - 80px)' // Altura mínima para que no se vea vacío
    },
    greeting: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '30px',
        borderBottom: '2px solid #61dafb',
        display: 'inline-block',
        paddingBottom: '5px'
    },
    statusMessage: {
        fontSize: '1.5em',
        color: '#555',
        marginTop: '50px'
    },
    error: {
        color: 'red'
    }
};

export default ItemListContainer;