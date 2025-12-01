// Server entry point

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// ------------------------------------------------------------------
// 🛑 CONFIGURACIÓN DE CORS CORREGIDA 🛑
// ------------------------------------------------------------------

// 1. **REEMPLAZA ESTA LÍNEA** con el dominio real de tu frontend en Vercel.
//    Ejemplo: 'https://nebula2-0-frontend.vercel.app'
const allowedOrigin = 'https://nebula2-0-k2fn.vercel.app/'; 

app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Añade todos los métodos que uses
    credentials: true // Si usas cookies o tokens de sesión
}));

// ------------------------------------------------------------------
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '🚀 NEBULA Smoke Culture',
        version: '1.0.0',
        status: 'active'
    });
});

// Rutas de API
app.use('/api', productRoutes);

// Manejo de errores
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});