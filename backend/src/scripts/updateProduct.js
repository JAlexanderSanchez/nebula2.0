// Script para actualizar productos en MongoDB
// Ejecutar con: node backend/src/scripts/updateProduct.js

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Función para actualizar un producto por slug o ID
const updateProduct = async (identifier, updates) => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar producto por ID o slug
    let product;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    } else {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      console.error('❌ Producto no encontrado');
      process.exit(1);
    }

    // Actualizar producto
    Object.keys(updates).forEach(key => {
      product[key] = updates[key];
    });

    await product.save();

    console.log(`✅ Producto "${product.name}" actualizado exitosamente`);
    console.log('\n📦 Producto actualizado:');
    console.log(JSON.stringify(product, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error.message);
    process.exit(1);
  }
};

// Función para actualizar múltiples productos
const updateMultipleProducts = async (updates) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    for (const update of updates) {
      const { identifier, ...productUpdates } = update;
      
      let product;
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        product = await Product.findById(identifier);
      } else {
        product = await Product.findOne({ slug: identifier });
      }

      if (product) {
        Object.keys(productUpdates).forEach(key => {
          product[key] = productUpdates[key];
        });
        await product.save();
        console.log(`✅ ${product.name} actualizado`);
      } else {
        console.log(`⚠️  Producto "${identifier}" no encontrado`);
      }
    }

    console.log('\n✅ Todos los productos actualizados');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Ejemplos de uso:

// EJEMPLO 1: Actualizar un solo producto por slug
// updateProduct('dozo-thc-p-sugar-sauce-5gr', {
//   price: 55.00,
//   stock: 'Agotado',
//   badge: 'NUEVO'
// });

// EJEMPLO 2: Actualizar un producto por ID
// updateProduct('67890abcdef1234567890123', {
//   price: 35.00,
//   rating: 4.9,
//   reviews: 100
// });

// EJEMPLO 3: Actualizar múltiples productos
// updateMultipleProducts([
//   {
//     identifier: 'dozo-thc-p-sugar-sauce-5gr',
//     price: 52.00,
//     stock: 'Disponible'
//   },
//   {
//     identifier: 'swf-3tk-40k',
//     price: 32.00,
//     badge: 'NUEVO'
//   }
// ]);

// EJEMPLO 4: Modificar especificaciones
// updateProduct('elf-bar-bc5000', {
//   specs: {
//     puffs: '6K',
//     nicotineLevel: '50MG',
//     liquidVolume: '14ML',
//     functions: 'BOOST MODE'
//   }
// });

// EJEMPLO 5: Cambiar imágenes
// updateProduct('dozo-thc-p-sugar-sauce-5gr', {
//   imageUrls: [
//     'https://nueva-imagen-1.jpg',
//     'https://nueva-imagen-2.jpg'
//   ]
// });

// EJEMPLO 6: Marcar como destacado
// updateProduct('death-row-7k', {
//   isFeatured: true
// });

// ============================================
// EDITA ESTA SECCIÓN CON TUS ACTUALIZACIONES:
// ============================================

// Descomenta y modifica según necesites:

// updateProduct('slug-del-producto', {
//   price: 25.00,
//   stock: 'Disponible',
//   badge: 'NUEVO',
//   rating: 4.5,
//   reviews: 50
// });

console.log('⚠️  Por favor edita este archivo y descomenta la función de actualización que necesites.');
console.log('📝 Ejemplos disponibles en el código.');

