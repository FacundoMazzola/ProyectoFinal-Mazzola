import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Crea una orden en Firestore
export const createOrder = async (buyer, items, total) => {
    try {
        const order = {
            buyer,                // { name, phone, email }
            items,                // array del carrito
            total,                // total calculado
            date: Timestamp.now() // fecha del servidor
        };

        const ordersRef = collection(db, "orders");
        const docRef = await addDoc(ordersRef, order);

        return docRef.id; // devolvemos ID de la orden
    } catch (error) {
        console.error("Error creando la orden:", error);
        throw error;
    }
};
