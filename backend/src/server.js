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

// 🚨 MODIFICACIÓN CLAVE PARA CORS 🚨
// 1. Definimos los orígenes permitidos
const allowedOrigins = [
    // Dominio de tu frontend en Vercel
    'https://nebula2-0-k2fn.vercel.app', 
    // Dominio de Render (opcional, pero buena práctica)
    'https://nebula2-0.onrender.com',    
    // Para pruebas locales
    'http://localhost:3000'              
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir la solicitud si el origen no está definido (como Postman o peticiones internas del servidor)
    // O si el origen está en la lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middlewares
app.use(cors(corsOptions)); // Aplicamos la nueva configuración CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 NEBULA Smoke Culture API',
    version: '1.0.0',
    status: 'active'
  });
});

// Rutas de API
// OJO: La ruta es /api/productos, lo que significa que el frontend debe buscar /api/products
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