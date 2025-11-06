// Script para poblar la base de datos con productos de ejemplo
// Ejecutar con: npm run seed (desde la carpeta backend)
// O: node src/scripts/seedProducts.js (desde la carpeta backend)

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: "Dozo THC-P Sugar Sauce 5 GR",
    slug: "dozo-thc-p-sugar-sauce-5gr",
    price: 50.00,
    originalPrice: null,
    description: "Experiencia premium de vapeo con tecnología avanzada",
    longDescription: "El Dozo THC-P Sugar Sauce ofrece una experiencia de vapeo incomparable con su fórmula especial de 5 gramos. Diseñado para usuarios que buscan calidad y sabor excepcional.",
    isFeatured: true,
    rating: 4.5,
    reviews: 24,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1590508969892-02fcc63dc1f2?w=600&h=600&fit=crop"
    ],
    availableColors: 5,
    badge: "Últimas unidades",
    specs: {
      puffs: "25K",
      nicotineLevel: "50MG",
      liquidVolume: "18ML",
      functions: "MED/BOOST"
    }
  },
  {
    name: "SWF 3tk 40K",
    slug: "swf-3tk-40k",
    price: 30.00,
    originalPrice: null,
    description: "Potencia y duración excepcional para todo el día",
    longDescription: "Con 40,000 puffs, el SWF 3tk es el compañero perfecto para usuarios intensivos. Tecnología de doble modo para máxima satisfacción.",
    isFeatured: true,
    rating: 4.8,
    reviews: 89,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1609006398633-b8e8c6a8f5f1?w=600&h=600&fit=crop"
    ],
    availableColors: 4,
    badge: "Últimas unidades",
    specs: {
      puffs: "40K",
      nicotineLevel: "35MG",
      liquidVolume: "20ML",
      functions: "DUAL MODE"
    }
  },
  {
    name: "Death Row 7k",
    slug: "death-row-7k",
    price: 10.50,
    originalPrice: null,
    description: "Sabor intenso y rendimiento confiable",
    longDescription: "Death Row 7k ofrece una experiencia de vapeo potente con un diseño compacto y elegante. Ideal para llevar contigo a todas partes.",
    isFeatured: false,
    rating: 4.3,
    reviews: 156,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
    ],
    availableColors: 6,
    badge: null,
    specs: {
      puffs: "7K",
      nicotineLevel: "50MG",
      liquidVolume: "12ML",
      functions: "STANDARD"
    }
  },
  {
    name: "Fume Infinity 3500",
    slug: "fume-infinity-3500",
    price: 15.00,
    originalPrice: 18.00,
    description: "Diseño premium con sabor infinito",
    longDescription: "Fume Infinity combina estilo y funcionalidad. Con 3500 puffs de calidad premium y múltiples sabores disponibles.",
    isFeatured: true,
    rating: 4.7,
    reviews: 203,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1624628639856-100bf817fd55?w=600&h=600&fit=crop"
    ],
    availableColors: 8,
    badge: "NUEVO",
    specs: {
      puffs: "3.5K",
      nicotineLevel: "50MG",
      liquidVolume: "10ML",
      functions: "STANDARD"
    }
  },
  {
    name: "Elf Bar BC5000",
    slug: "elf-bar-bc5000",
    price: 22.00,
    originalPrice: null,
    description: "Calidad superior con tecnología avanzada",
    longDescription: "Elf Bar BC5000 es conocido por su calidad excepcional y durabilidad. Con más de 5000 puffs y una batería de larga duración.",
    isFeatured: true,
    rating: 4.9,
    reviews: 342,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1533409962075-6701ad359ddd?w=600&h=600&fit=crop"
    ],
    availableColors: 12,
    badge: null,
    specs: {
      puffs: "5K",
      nicotineLevel: "50MG",
      liquidVolume: "13ML",
      functions: "STANDARD"
    }
  },
  {
    name: "Hyde Retro Rave",
    slug: "hyde-retro-rave",
    price: 18.50,
    originalPrice: null,
    description: "Estilo retro con sabor moderno",
    longDescription: "Hyde Retro Rave combina un diseño único con sabores vibrantes. Perfecto para aquellos que buscan algo diferente.",
    isFeatured: false,
    rating: 4.4,
    reviews: 98,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop"
    ],
    availableColors: 7,
    badge: null,
    specs: {
      puffs: "2.5K",
      nicotineLevel: "50MG",
      liquidVolume: "10ML",
      functions: "STANDARD"
    }
  },
  {
    name: "Flum Float 3000",
    slug: "flum-float-3000",
    price: 16.00,
    originalPrice: 20.00,
    description: "Suave y elegante como flotar en el aire",
    longDescription: "Flum Float ofrece una experiencia de vapeo suave y satisfactoria. Diseño ergonómico y sabores refrescantes.",
    isFeatured: false,
    rating: 4.6,
    reviews: 167,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f2d?w=600&h=600&fit=crop"
    ],
    availableColors: 9,
    badge: "Últimas unidades",
    specs: {
      puffs: "3K",
      nicotineLevel: "50MG",
      liquidVolume: "8ML",
      functions: "STANDARD"
    }
  },
  {
    name: "KangVape Onee Max",
    slug: "kangvape-onee-max",
    price: 25.00,
    originalPrice: null,
    description: "Máxima potencia en un diseño compacto",
    longDescription: "KangVape Onee Max ofrece la máxima potencia en un dispositivo compacto. Ideal para usuarios que buscan rendimiento superior.",
    isFeatured: true,
    rating: 4.8,
    reviews: 124,
    stock: "Disponible",
    imageUrls: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
    ],
    availableColors: 5,
    badge: "NUEVO",
    specs: {
      puffs: "5K",
      nicotineLevel: "50MG",
      liquidVolume: "13ML",
      functions: "BOOST MODE"
    }
  }
];

const seedProducts = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar productos existentes (opcional - comentar si quieres mantener los existentes)
    // await Product.deleteMany({});
    // console.log('🗑️  Productos existentes eliminados');

    // Insertar productos
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} productos creados exitosamente`);

    // Mostrar los productos creados
    console.log('\n📦 Productos creados:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar productos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedProducts();

