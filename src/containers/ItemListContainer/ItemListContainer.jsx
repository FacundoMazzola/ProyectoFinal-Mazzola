// src/containers/ItemListContainer/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList.jsx';

import { db } from '../../api/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const productsRef = collection(db, "products");
        let q;

        // Si hay categoría en la URL: filtrar
        if (categoryId) {
            q = query(productsRef, where("category", "==", categoryId));
        } else {
            q = query(productsRef);
        }

        getDocs(q)
            .then(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (data.length === 0) {
                    setError(`No hay productos en la categoría: ${categoryId}`);
                }

                setProducts(data);
            })
            .catch(err => {
                console.error("Error cargando productos:", err);
                setError("Hubo un problema al cargar los productos.");
            })
            .finally(() => {
                setLoading(false);
            });

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
