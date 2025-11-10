import { createContext, useContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agregar producto (si ya existe, suma cantidad)
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existing = prevCart.find(p => p.id === item.id);
            if (existing) {
                return prevCart.map(p =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));
    const clearCart = () => setCart([]);

    // Calcular total (siempre numérico)
    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};
