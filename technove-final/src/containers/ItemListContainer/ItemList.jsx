// src/containers/ItemListContainer/ItemList.jsx
import Item from "../../components/Item/item.jsx";
const ItemList = ({ products }) => {

    return (
        <div style={styles.grid}>
            {products.map(prod => (
                <Item key={prod.id} product={prod} />
            ))}
        </div>
    );
};

const styles = {
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
};

export default ItemList;
