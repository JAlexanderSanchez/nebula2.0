// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Nebula2' // <--- ¡Asegura que tu base de datos correcta esté aquí!
    }); 
    console.log('✅ MongoDB Atlas conectado exitosamente');
  } catch (error) {
    // Si la conexión falla, se detendrá y verás el error
    console.error('❌ Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};
module.exports = connectDB;