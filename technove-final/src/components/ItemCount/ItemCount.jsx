// src/components/ItemCount/ItemCount.jsx
import { useState } from 'react';

// maxStock: Cantidad máxima disponible (stock)
// onAdd: Función que se ejecuta al presionar "Agregar al Carrito"
const ItemCount = ({ maxStock, onAdd }) => {
    // 1. Estado local para el contador (inicia en 1)
    const [count, setCount] = useState(1);

    // Función para decrementar el contador (mínimo 1)
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Función para incrementar el contador (máximo stock)
    const increment = () => {
        if (count < maxStock) {
            setCount(count + 1);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.controls}>
                <button
                    onClick={decrement}
                    disabled={count === 1}
                    style={styles.button}
                >
                    -
                </button>
                <span style={styles.countDisplay}>{count}</span>
                <button
                    onClick={increment}
                    disabled={count === maxStock}
                    style={styles.button}
                >
                    +
                </button>
            </div>

            <p style={styles.stockInfo}>Stock disponible: {maxStock}</p>

            <button
                onClick={() => onAdd(count)}
                disabled={maxStock === 0} // No se puede agregar si no hay stock
                style={{ ...styles.addButton, opacity: maxStock === 0 ? 0.6 : 1 }}
            >
                Agregar al Carrito
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '300px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9'
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px'
    },
    button: {
        backgroundColor: '#61dafb', // Color React
        color: '#282c34',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '1.5em',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        margin: '0 10px'
    },
    countDisplay: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        minWidth: '30px'
    },
    stockInfo: {
        fontSize: '0.9em',
        color: '#777',
        marginBottom: '15px'
    },
    addButton: {
        backgroundColor: '#4CAF50', // Verde de acción
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1em',
        width: '100%',
        transition: 'background-color 0.2s'
    }
};

export default ItemCount;