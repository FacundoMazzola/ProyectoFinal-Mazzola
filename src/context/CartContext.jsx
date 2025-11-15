// src/context/CartContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agrega item (item debe traer { id, name, price, quantity, ... })
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existing = prevCart.find(p => p.id === item.id);

            if (existing) {
                return prevCart.map(p =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + (item.quantity || 1) }
                        : p
                );
            }

            return [...prevCart, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(p => p.id !== id));
    };

    const clearCart = () => setCart([]);

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
                    : item
            )
        );
    };

    const totalPrice = useMemo(() => {
        return cart.reduce(
            (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
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
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};

