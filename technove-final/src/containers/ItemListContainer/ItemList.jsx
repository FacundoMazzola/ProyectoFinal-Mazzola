// src/containers/ItemListContainer/ItemList.jsx
import Item from '../../components/Item/Item';

// Recibe la lista de productos y la mapea a tarjetas Item
const ItemList = ({ products }) => {
    return (
        <div style={styles.listContainer}>
            {/* Mapea cada producto a un componente Item */}
            {products.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};

const styles = {
    listContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f0f2f5', // Fondo suave
        minHeight: '80vh'
    }
};

export default ItemList;