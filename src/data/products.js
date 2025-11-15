// src/data/products.js
import mouseG305 from '../assets/image/mouse-logitech-g305.webp';
import tecladoKumara from '../assets/image/teclado-kumara-redragon.webp';
import auricularesRazer from '../assets/image/auriculares-razer.webp';
import monitorSamsung from '../assets/image/monitor-samsung-odisea.webp';
import modpadHyperex from '../assets/image/modpad-hyperex.webp';
import MonitorViewSonic from '../assets/image/Monitor-ViewSonic-180Hz.jpg';
import WebCamLogitech from '../assets/image/WebCam-Logitech-1080p.jpg';
import monitorAsusTuf from '../assets/image/monitor-AsusTuf-180Hz.jpg';
import MicSteelSeries from '../assets/image/Mic-SteelSeries-XLR.jpg';
import AuricularesCorsair from '../assets/image/Auriculares-Corsair-A.jpg';

// 📦 LISTA DE PRODUCTOS
export const products = [
    {
        id: 1,
        title: "Mouse Logitech G305",
        price: 29999,
        category: "perifericos",
        image: mouseG305,
        description: "Mouse gamer inalámbrico con sensor HERO y diseño ergonómico.",
        stock: 10
    },
    {
        id: 2,
        title: "Teclado Redragon Kumara",
        price: 25999,
        category: "perifericos",
        image: tecladoKumara,
        description: "Teclado mecánico compacto con switches Redragon Blue.",
        stock: 8
    },
    {
        id: 3,
        title: "Auriculares Razer Kraken",
        price: 39999,
        category: "perifericos",
        image: auricularesRazer,
        description: "Auriculares gaming con sonido envolvente y micrófono retráctil.",
        stock: 6
    },
    {
        id: 4,
        title: "Monitor Samsung Odyssey",
        price: 199999,
        category: "monitores",
        image: monitorSamsung,
        description: "Monitor curvo QHD de 27 pulgadas con 144 Hz.",
        stock: 4
    },
    {
        id: 5,
        title: "Joystick HyperEX Modpad",
        price: 17999,
        category: "perifericos",
        image: modpadHyperex,
        description: "Modpad ergonómico compatible con PC.",
        stock: 7
    },

    {
        id: 6,
        title: "Monitor ViewSonic 24'' 180Hz",
        price: 149999,
        category: "monitores",
        image: MonitorViewSonic,
        description: "Monitor ViewSonic de 24 pulgadas con panel IPS y frecuencia de 180 Hz, ideal para gaming competitivo.",
        stock: 5
    },
    {
        id: 7,
        title: "WebCam Logitech Full HD 1080p",
        price: 45999,
        category: "perifericos",
        image: WebCamLogitech,
        description: "Cámara web Logitech con resolución Full HD 1080p y autoenfoque, perfecta para streaming y videollamadas.",
        stock: 12
    },
    {
        id: 8,
        title: "Monitor ASUS TUF Gaming 27'' 180Hz",
        price: 219999,
        category: "monitores",
        image: monitorAsusTuf,
        description: "Monitor ASUS TUF de 27 pulgadas con 180 Hz, tecnología Adaptive-Sync y panel Fast IPS.",
        stock: 3
    },
    {
        id: 9,
        title: "Micrófono SteelSeries XLR",
        price: 99999,
        category: "perifericos",
        image: MicSteelSeries,
        description: "Micrófono profesional SteelSeries con conexión XLR, ideal para podcast, streaming y grabación de estudio.",
        stock: 6
    },
    {
        id: 10,
        title: "Auriculares Corsair Gaming",
        price: 59999,
        category: "perifericos",
        image: AuricularesCorsair,
        description: "Auriculares Corsair con sonido envolvente, almohadillas de espuma viscoelástica y micrófono de alta claridad.",
        stock: 9
    }
];
