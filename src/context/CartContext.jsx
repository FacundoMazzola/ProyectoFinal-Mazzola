// src/context/CartContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    
    const sanitizeProduct = (item) => ({
        id: item.id ?? `no-id`,
        name: item.name ?? "Producto",
        price: Number(item.price ?? 0),
        image: item.image ?? item.img ?? "",
        description: item.description ?? "",
        category: item.category ?? "",
        stock: Number(item.stock ?? 0),
        quantity: Number(item.quantity ?? 1),
    });

    const addToCart = (rawItem) => {
        const item = sanitizeProduct(rawItem);

        setCart((prevCart) => {
            const existing = prevCart.find((p) => p.id === item.id);

            if (existing) {
                return prevCart.map((p) =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            }

            return [...prevCart, item];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => setCart([]);

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const totalPrice = useMemo(() => {
        return cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};

