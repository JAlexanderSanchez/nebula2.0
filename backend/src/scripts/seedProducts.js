// Script para poblar la base de datos con productos de ejemplo
// Ejecutar con: npm run seed (desde la carpeta backend)
// O: node src/scripts/seedProducts.js (desde la carpeta backend)

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: "Fume x Fruitia Vape Desechable 8000 Puffs, 5% Nicotina",
    slug: "fume-x-fruitia-desechable-8000-puffs",
    price: 12,
    originalPrice: null,
    description: "Vape desechable de alto rendimiento con bobina de malla y pantalla LED.",
    longDescription: "El Fume x Fruitia 8000 Puffs es un dispositivo de vapeo desechable y recargable que combina potencia y sabor. Ofrece más de 8000 caladas con 5% de nicotina, 17 ml de e-líquido, batería recargable (700 mAh) y pantalla LED para monitorear niveles.",
    isFeatured: true,
    rating: 4.5,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://cliccloud.co/empresas/productos-600/clic-v2-Q7ffOgbcCGYVwquphEO2-2025-10-10.png",
      "URL_IMAGEN_FUME_FRUITIA_2"
    ],
    availableColors: 3,
    badge: "NUEVO",
    specs: {
      puffs: "8000",
      nicotineLevel: "5%",
      liquidVolume: "17ml",
      battery: "700 mAh",
      charging: "USB-C",
      coil: "Mesh Coil",
      display: "Pantalla LED (Batería y Líquido)"
    }
  },
  {
    name: "Death Row Vapes 7000 Puffs - Blue Razz",
    slug: "death-row-vapes-7000-blue-razz",
    price: 10,
    originalPrice: null,
    description: "Vape desechable Death Row (Snoop Dogg) con tecnología de malla y batería recargable, sabor Blue Razz.",
    longDescription: "Dispositivo desechable y recargable que ofrece hasta 7000 caladas. Contiene 12 ml de e-líquido con 5% de sal de nicotina y una batería de 700 mAh recargable por USB-C. El sabor Blue Razz combina mora azul con un toque fresco.",
    isFeatured: true,
    rating: 4.5,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://cdn11.bigcommerce.com/s-5zbebjcuob/images/stencil/1280x1280/products/7194/18501/GR010604-1__65963.1696937320.jpg?c=2",
      "URL_IMAGEN_BLUE_RAZZ_2"
    ],
    availableColors: 4,
    badge: "NUEVO",
    specs: {
      puffs: "7000",
      nicotineLevel: "5%",
      liquidVolume: "12ml",
      battery: "700 mAh",
      charging: "USB-C",
      coil: "Mesh Coil",
      flavor: "Blue Razz (Morazul)"
    }
  },
  {
    name: "Yogi Bar 8000 Puffs - Varios sabores - 5% Nicotina",
    slug: "yogi-bar-8000",
    price: 9,
    originalPrice: null,
    description: "Vape desechable Yogi Bar con el galardonado e-líquido de barra de granola de fresa.",
    longDescription: "Dispositivo desechable recargable de la marca Yogi E-Liquid. Ofrece hasta 8000 caladas, 17ml de e-líquido de 5% de nicotina y una batería recargable de 600mAh. Sabor a dulce y madura fresa combinada con la dulzura natural.",
    isFeatured: true,
    rating: 4.6,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://vapecraftinc.com/media/amasty/webp/catalog/product/cache/9af08a49c64f622a3ecfb8ecadcd8f84/y/o/yogi-bar-8000-disposable-vape_jpg.webp",
      "URL_IMAGEN_YOGI_STRAWBERRY_2"
    ],
    availableColors: 3,
    badge: "NUEVO",
    specs: {
      puffs: "8000",
      nicotineLevel: "5%",
      liquidVolume: "17ml",
      battery: "600 mAh",
      charging: "USB-C",
      coil: "Mesh Coil",
      airflow: "Ajustable"
    }
  },
  {
    name: "Flavor Vapes 6000 Puffs - Cool Mint",
    slug: "flavor-vapes-6000-cool-mint",
    price: 10,
    originalPrice: null,
    description: "Vape desechable Flavor Vapes con diseño compacto y 6000 caladas garantizadas, sabor menta fría.",
    longDescription: "Un dispositivo desechable de alto rendimiento con 13ml de e-líquido y 5% de nicotina. Cuenta con una batería recargable vía USB-C y bobina Mesh para una producción de vapor consistente. El sabor Cool Mint ofrece una sensación limpia y refrescante de menta.",
    isFeatured: false,
    rating: 4.4,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "URL_IMAGEN_FLAVOR_COOL_MINT_1",
      "URL_IMAGEN_FLAVOR_COOL_MINT_2"
    ],
    availableColors: 4,
    badge: "NUEVO",
    specs: {
      puffs: "6000",
      nicotineLevel: "5%",
      liquidVolume: "13ml",
      charging: "USB-C",
      coil: "Mesh Coil",
      flavor: "Cool Mint (Menta Fría)"
    }
  },
  {
    name: "Strio Vapes XC6500 Puffs - 5% de Nicotina",
    slug: "strio-vapes-xc6500-blue-razz-ice",
    price: 14,
    originalPrice: null,
    description: "Vape desechable Strio XC, recargable y con un diseño ergonómico, sabor mora azul helada.",
    longDescription: "El Strio XC ofrece aproximadamente 6500 caladas con 12ml de e-líquido de sal de nicotina al 5%. Refrescante.",
    isFeatured: false,
    rating: 4.3,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://westcoastvapesupply.com/cdn/shop/articles/The_Strio_EBCreate_XC6500_Disposable_Vape_Flavor_Review.jpg?v=1712899037&width=700",
      "URL_IMAGEN_STRIO_BLUE_RAZZ_2"
    ],
    availableColors: 5,
    badge: "Últimas unidades",
    specs: {
      puffs: "6500",
      nicotineLevel: "5%",
      liquidVolume: "12ml",
      charging: "USB-C",
      coil: "Mesh Coil",
      flavor: "Blue Razz Ice"
    }
  },
  {
    name: "UWELL Vapes 12000 Puffs - Watermelon Ice",
    slug: "uwell-vapes-12000-watermelon-ice",
    price: 18,
    originalPrice: null,
    description: "Vape desechable UWELL de ultra alta capacidad con tecnología de doble malla y 12000 caladas.",
    longDescription: "Dispositivo desechable insignia de UWELL, diseñado para longevidad y sabor intenso. Ofrece hasta 12000 caladas, 5% de nicotina y una batería recargable de larga duración. Su bobina dual asegura que cada calada sea potente. Sabor: Sandía dulce con un acabado refrescante de hielo.",
    isFeatured: true,
    rating: 4.8,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://nubedensa.com/wp-content/uploads/2025/09/482222602_1912744686167799_3594784751135893163_n-700x700.webp.jpg",
      "URL_IMAGEN_UWELL_WM_ICE_2"
    ],
    availableColors: 2,
    badge: "NUEVO",
    specs: {
      puffs: "12000",
      nicotineLevel: "5%",
      liquidVolume: "20ml",
      charging: "USB-C",
      coil: "Dual Mesh Coil",
      display: "LED de Batería y Líquido",
      flavor: "Watermelon Ice"
    }
  },
  {
    name: "NEXA Vapes 20000 Puffs - Chicago Blueberry Mint",
    slug: "nexa-vapes-20000-chicago-blueberry-mint",
    price: 20,
    originalPrice: null,
    description: "Vape desechable NEXA de capacidad extrema con pantalla de visualización y tecnología de doble malla.",
    longDescription: "El NEXA 20K ofrece hasta 20,000 caladas, impulsado por una bobina dual de malla para sabor y vapor constantes. Contiene 5% de nicotina, batería recargable y una pantalla grande para monitorear el e-líquido y la batería. El sabor Chicago Blueberry Mint combina arándanos maduros con un toque refrescante de menta.",
    isFeatured: true,
    rating: 4.7,
    reviews: 0,
    stock: "Disponible",
    imageUrls: [
      "https://tvx45.com/cdn/shop/files/1_12_2024_NEXA_N20000_Disposable_Vape_10__76867.1706743633_1024x1024.jpg?v=1711221934",
      "URL_IMAGEN_NEXA_CBM_2"
    ],
    availableColors: 2,
    badge: "Últimas unidades",
    specs: {
      puffs: "20000",
      nicotineLevel: "5%",
      liquidVolume: "20ml",
      charging: "USB-C",
      coil: "Dual Mesh Coil",
      display: "Pantalla LED de Monitoreo",
      flavor: "Chicago Blueberry Mint"
    }
  }
];

const seedProducts = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar el schema del modelo
    console.log('\n🔍 Verificando schema del modelo Product...');
    const schema = Product.schema;
    
    // Verificar campos requeridos en specs
    if (schema.path('specs.puffs')) {
      console.log('✓ specs.puffs encontrado');
    }
    if (schema.path('specs.nicotineLevel')) {
      console.log('✓ specs.nicotineLevel encontrado');
    }
    if (schema.path('specs.liquidVolume')) {
      console.log('✓ specs.liquidVolume encontrado');
    }
    
    // Verificar valores permitidos para badge
    if (schema.path('badge') && schema.path('badge').enumValues) {
      console.log('✓ Valores permitidos para badge:', schema.path('badge').enumValues);
    }

    // Limpiar productos existentes (opcional - comentar si quieres mantener los existentes)
    await Product.deleteMany({});
    console.log('\n🗑️  Productos existentes eliminados');

    // Insertar productos uno por uno para mejor debugging
    console.log('\n📦 Insertando productos...');
    const createdProducts = [];
    
    for (let i = 0; i < products.length; i++) {
      try {
        const product = await Product.create(products[i]);
        createdProducts.push(product);
        console.log(`✅ ${i + 1}. ${product.name} - ${product.price}`);
      } catch (error) {
        console.error(`❌ Error en producto ${i + 1} (${products[i].name}):`, error.message);
      }
    }

    console.log(`\n✅ ${createdProducts.length} de ${products.length} productos creados exitosamente`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar productos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedProducts();