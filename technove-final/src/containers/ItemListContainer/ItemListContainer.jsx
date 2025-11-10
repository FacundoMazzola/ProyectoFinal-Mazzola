// src/containers/ItemListContainer/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList.jsx';
import { products as localProducts } from '../../data/products';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Simula carga asincrónica (por estética)
        setTimeout(() => {
            if (categoryId) {
                const filtered = localProducts.filter(p => p.category === categoryId);
                if (filtered.length === 0) {
                    setError(`No hay productos en la categoría: ${categoryId}`);
                }
                setProducts(filtered);
            } else {
                setProducts(localProducts);
            }
            setLoading(false);
        }, 800);
    }, [categoryId]);

    return (
        <main style={styles.main}>
            <h2 style={styles.greeting}>
                {greeting} {categoryId ? `(${categoryId.toUpperCase()})` : 'Catálogo Completo'}
            </h2>

            {loading && <p style={styles.statusMessage}>Cargando productos... 🔄</p>}
            {error && <p style={{ ...styles.statusMessage, ...styles.error }}>⚠️ {error}</p>}

            {!loading && !error && products.length > 0 && <ItemList products={products} />}
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
        minHeight: 'calc(100vh - 80px)',
    },
    greeting: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '30px',
        borderBottom: '2px solid #61dafb',
        display: 'inline-block',
        paddingBottom: '5px',
    },
    statusMessage: {
        fontSize: '1.5em',
        color: '#555',
        marginTop: '50px',
    },
    error: {
        color: 'red',
    },
};

export default ItemListContainer;
