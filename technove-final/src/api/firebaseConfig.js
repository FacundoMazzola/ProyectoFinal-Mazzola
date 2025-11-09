// src/api/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE PARA TECHNOVE ---
// Credenciales de tu proyecto 'technove-490ad'
const firebaseConfig = {
    apiKey: "AIzaSyDHMg-OIYo7uuK1wVW3g95nzvSMTMcJsf0",
    authDomain: "technove-490ad.firebaseapp.com",
    projectId: "technove-490ad",
    storageBucket: "technove-490ad.firebasestorage.app",
    messagingSenderId: "5962388573",
    appId: "1:5962388573:web:0cfe68bc7e0a6c810469b4"
};
// ---------------------------------------------

// Inicializa Firebase App
const app = initializeApp(firebaseConfig);

// Inicializa Firestore Database y lo exporta para usarlo en los contenedores
export const db = getFirestore(app);