// src/components/Item/Item.jsx
import { Link } from 'react-router-dom';

// Recibe un objeto 'item' que contiene todos los datos del producto
const Item = ({ item }) => {
    return (
        // El Link envuelve toda la tarjeta para navegar al detalle
        <Link to={`/item/${item.id}`} style={styles.cardLink}>
            <div style={styles.card}>
                <h2 style={styles.title}>{item.name}</h2>
                <img
                    src={item.img}
                    alt={item.name}
                    style={styles.image}
                    // Fallback si la URL de la imagen no carga
                    onError={(e) => { e.target.onerror = null; e.target.src = '[https://placehold.co/300x200/282c34/61dafb?text=Imagen+No+Disp](https://placehold.co/300x200/282c34/61dafb?text=Imagen+No+Disp).'; }}
                />
                <p style={styles.price}>
                    Precio: ${item.price.toLocaleString('es-AR')}
                </p>
                <p style={styles.category}>
                    Categoría: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </p>
                <div style={styles.detailsButton}>
                    Ver Detalles
                </div>
            </div>
        </Link>
    );
};

const styles = {
    cardLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        margin: '15px',
        width: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '10px'
    },
    title: {
        fontSize: '1.5em',
        marginBottom: '10px',
        color: '#282c34',
        textAlign: 'center'
    },
    price: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#4CAF50', // Verde de precio
        marginBottom: '5px'
    },
    category: {
        fontSize: '0.9em',
        color: '#777',
        marginBottom: '15px'
    },
    detailsButton: {
        backgroundColor: '#61dafb',
        color: '#282c34',
        padding: '8px 15px',
        borderRadius: '5px',
        fontWeight: 'bold',
        marginTop: 'auto', // Empuja el botón hacia abajo
        transition: 'background-color 0.2s'
    }
};

export default Item;