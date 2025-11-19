// src/components/ItemCount/ItemCount.jsx
import { useState } from "react";

const ItemCount = ({ maxStock = 0, onAdd }) => {
    const [count, setCount] = useState(1);

    const increase = () => {
        if (count < maxStock) setCount(count + 1);
    };

    const decrease = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleAdd = () => {
        if (count > 0 && count <= maxStock) {
            onAdd(count); // Envía la cantidad al ItemDetailContainer
            setCount(1); // Opcional: reiniciar contador
        }
    };

    return (
        <div style={styles.container}>
            
            {/* Controles de cantidad */}
            <div style={styles.controls}>
                <button style={styles.btn} onClick={decrease}>-</button>
                <span style={styles.number}>{count}</span>
                <button style={styles.btn} onClick={increase}>+</button>
            </div>

            {/* Botón agregar */}
            <button
                style={styles.addButton}
                onClick={handleAdd}
                disabled={maxStock === 0}
            >
                {maxStock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
        maxWidth: "200px"
    },
    controls: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden"
    },
    btn: {
        background: "#eee",
        padding: "8px 12px",
        fontSize: "1.2rem",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold"
    },
    number: {
        padding: "0 15px",
        fontSize: "1.2rem",
        fontWeight: "600",
        background: "#fff"
    },
    addButton: {
        width: "100%",
        backgroundColor: "#f57c00",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        fontWeight: "600",
        border: "none"
    }
};

export default ItemCount;
