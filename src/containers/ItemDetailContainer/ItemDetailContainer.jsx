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
    const [quantityAdded, setQuantityAdded] = useState(0);

    const { itemId } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            setProduct(null);
            setQuantityAdded(0);

            try {
                const ref = doc(db, "products", itemId);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setError("Producto no encontrado. Verificá el ID.");
                    return;
                }

                setProduct({ id: snap.id, ...snap.data() });

            } catch (err) {
                console.error(err);
                setError("Hubo un error al cargar este producto.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [itemId]);

    const handleOnAdd = (quantity) => {
        if (!product) return;

        addToCart({
            id: product.id,
            name: product.name ?? "Producto sin nombre",
            price: Number(product.price ?? 0),


            image: product.image ?? product.img ?? "",

            description: product.description ?? "",
            category: product.category ?? "",
            stock: Number(product.stock ?? 10),
            quantity
        });

        setQuantityAdded(quantity);
    };

    if (loading)
        return <p style={styles.statusMessage}>Cargando producto... 🔄</p>;

    if (error)
        return (
            <div style={styles.errorBox}>
                <p style={styles.errorText}>⚠️ {error}</p>
                <Link to="/" style={styles.backButton}>Volver al inicio</Link>
            </div>
        );

    if (!product) return null;

    return (
        <div style={styles.container}>
            <div style={styles.detailCard}>
                <img
                    src={product.image ?? product.img ?? 'https://placehold.co/450x350?text=Sin+Imagen'}
                    alt={product.name}
                    style={styles.image}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/450x350/282c34/fff?text=Imagen+No+Disponible';
                    }}
                />

                <div style={styles.info}>
                    <h1 style={styles.title}>{product.name}</h1>

                    <p style={styles.price}>
                        {Number(product.price).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS"
                        })}
                    </p>

                    <p style={styles.description}>{product.description}</p>

                    <p style={styles.category}>
                        Categoría: <b>{product.category ?? "—"}</b>
                    </p>

                    {quantityAdded > 0 ? (
                        <div style={styles.afterAddBox}>
                            <div style={styles.addedBadge}>
                                ✔ Agregaste {quantityAdded} al carrito
                            </div>

                            <Link to="/cart" style={styles.goToCartButton}>
                                Ir al carrito
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
                            maxStock={product.stock ?? 10}
                            onAdd={handleOnAdd}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
