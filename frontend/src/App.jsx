import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Package, Droplets, Zap, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from './services/api';

const WHATSAPP_NUMBER = '59360249628';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  
  // Estados para productos y carga
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos del backend al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Iniciando carga de productos desde el backend...');
        console.log('📍 URL del API:', process.env.REACT_APP_API_URL || 'https://nebula2-0.onrender.com');
        
        const response = await productService.getAllProducts();
        
        console.log('✅ Respuesta recibida del backend:', response);
        
        // El backend devuelve { success: true, data: products }
        if (response.success && response.data) {
          console.log(`✅ ${response.data.length} productos cargados desde MongoDB`);
          setProducts(response.data);
        } else {
          console.warn('⚠️ Respuesta del backend sin datos:', response);
          setError('No se pudieron cargar los productos');
        }
      } catch (err) {
        console.error('❌ Error al cargar productos:', err);
        console.error('❌ Detalles del error:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url
        });
        setError('Error al conectar con el servidor. Verifica que el backend esté funcionando.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Productos hardcodeados como fallback (se eliminarán después de verificar que funciona)
  const fallbackProducts = [
  {
    "_id": "1",
    "name": "Fume x Fruitia Vape Desechable 8000 Puffs, 5% Nicotina",
    "slug": "fume-x-fruitia-desechable-8000-puffs",
    "price": 12.00,
    "originalPrice": null,
    "rating": 4.5,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "8000",
      "nicotineLevel": "5%",
      "liquidVolume": "17ml",
      "battery": "700 mAh",
      "charging": "USB-C",
      "coil": "Mesh Coil",
      "display": "Pantalla LED (Batería y Líquido)"
    },
    "availableColors": 3,
    "imageUrls": [
      "https://cliccloud.co/empresas/productos-600/clic-v2-Q7ffOgbcCGYVwquphEO2-2025-10-10.png",
      "URL_IMAGEN_FUME_FRUITIA_2"
    ],
    "badge": "NUEVO",
    "description": "Vape desechable de alto rendimiento con bobina de malla y pantalla LED.",
    "longDescription": "El Fume x Fruitia 8000 Puffs es un dispositivo de vapeo desechable y recargable que combina potencia y sabor. Ofrece más de 8000 caladas con 5% de nicotina, 17 ml de e-líquido, batería recargable (700 mAh) y pantalla LED para monitorear niveles.",
    "isFeatured": true
  },
  {
    "_id": "2",
    "name": "Death Row Vapes 7000 Puffs - Blue Razz",
    "slug": "death-row-vapes-7000-blue-razz",
    "price": 10.00,
    "originalPrice": null,
    "rating": 4.5,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "7000",
      "nicotineLevel": "5%",
      "liquidVolume": "12ml",
      "battery": "700 mAh",
      "charging": "USB-C",
      "coil": "Mesh Coil",
      "flavor": "Blue Razz (Morazul)"
    },
    "availableColors": 4,
    "imageUrls": [
      "https://cdn11.bigcommerce.com/s-5zbebjcuob/images/stencil/1280x1280/products/7194/18501/GR010604-1__65963.1696937320.jpg?c=2",
      "URL_IMAGEN_BLUE_RAZZ_2"
    ],
    "badge": "NUEVO",
    "description": "Vape desechable Death Row (Snoop Dogg) con tecnología de malla y batería recargable, sabor Blue Razz.",
    "longDescription": "Dispositivo desechable y recargable que ofrece hasta 7000 caladas. Contiene 12 ml de e-líquido con 5% de sal de nicotina y una batería de 700 mAh recargable por USB-C. El sabor Blue Razz combina mora azul con un toque fresco.",
    "isFeatured": true
  },
  {
    "_id": "3",
    "name": "Yogi Bar 8000 Puffs - Varios sabores - 5% Nicotina",
    "slug": "yogi-bar-8000",
    "price": 9.00,
    "originalPrice": null,
    "rating": 4.6,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "8000",
      "nicotineLevel": "5%",
      "liquidVolume": "17ml",
      "battery": "600 mAh",
      "charging": "USB-C",
      "coil": "Mesh Coil",
      "airflow": "Ajustable"
    },
    "availableColors": 3,
    "imageUrls": [
      "https://vapecraftinc.com/media/amasty/webp/catalog/product/cache/9af08a49c64f622a3ecfb8ecadcd8f84/y/o/yogi-bar-8000-disposable-vape_jpg.webp",
      "URL_IMAGEN_YOGI_STRAWBERRY_2"
    ],
    "badge": "NUEVO",
    "description": "Vape desechable Yogi Bar con el galardonado e-líquido de barra de granola de fresa.",
    "longDescription": "Dispositivo desechable recargable de la marca Yogi E-Liquid. Ofrece hasta 8000 caladas, 17ml de e-líquido de 5% de nicotina y una batería recargable de 600mAh. Sabor a dulce y madura fresa combinada con la dulzura natural.",
    "isFeatured": true
  },
  {
    "_id": "4",
    "name": "Flavor Vapes 6000 Puffs - Cool Mint",
    "slug": "flavor-vapes-6000-cool-mint",
    "price": 10.00,
    "originalPrice": null,
    "rating": 4.4,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "6000",
      "nicotineLevel": "5%",
      "liquidVolume": "13ml",
      "charging": "USB-C",
      "coil": "Mesh Coil",
      "flavor": "Cool Mint (Menta Fría)"
    },
    "availableColors": 4,
    "imageUrls": [
      "URL_IMAGEN_FLAVOR_COOL_MINT_1",
      "URL_IMAGEN_FLAVOR_COOL_MINT_2"
    ],
    "badge": "NUEVO",
    "description": "Vape desechable Flavor Vapes con diseño compacto y 6000 caladas garantizadas, sabor menta fría.",
    "longDescription": "Un dispositivo desechable de alto rendimiento con 13ml de e-líquido y 5% de nicotina. Cuenta con una batería recargable vía USB-C y bobina Mesh para una producción de vapor consistente. El sabor Cool Mint ofrece una sensación limpia y refrescante de menta.",
    "isFeatured": false
  },
  {
    "_id": "5",
    "name": "Strio Vapes XC6500 Puffs - 5% de Nicotina",
    "slug": "strio-vapes-xc6500-blue-razz-ice",
    "price": 14.00,
    "originalPrice": null,
    "rating": 4.3,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "6500",
      "nicotineLevel": "5%",
      "liquidVolume": "12ml",
      "charging": "USB-C",
      "coil": "Mesh Coil",
      "flavor": "Blue Razz Ice"
    },
    "availableColors": 5,
    "imageUrls": [
      "https://westcoastvapesupply.com/cdn/shop/articles/The_Strio_EBCreate_XC6500_Disposable_Vape_Flavor_Review.jpg?v=1712899037&width=700",
      "URL_IMAGEN_STRIO_BLUE_RAZZ_2"
    ],
    "badge": "Últimas unidades",
    "description": "Vape desechable Strio XC, recargable y con un diseño ergonómico, sabor mora azul helada.",
    "longDescription": "El Strio XC ofrece aproximadamente 6500 caladas con 12ml de e-líquido de sal de nicotina al 5%. Refrescante.",
    "isFeatured": false
  },
  {
    "_id": "6",
    "name": "UWELL Vapes 12000 Puffs - Watermelon Ice",
    "slug": "uwell-vapes-12000-watermelon-ice",
    "price": 18.00,
    "originalPrice": null,
    "rating": 4.8,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "12000",
      "nicotineLevel": "5%",
      "liquidVolume": "20ml",
      "charging": "USB-C",
      "coil": "Dual Mesh Coil",
      "display": "LED de Batería y Líquido",
      "flavor": "Watermelon Ice"
    },
    "availableColors": 2,
    "imageUrls": [
      "https://nubedensa.com/wp-content/uploads/2025/09/482222602_1912744686167799_3594784751135893163_n-700x700.webp.jpg",
      "URL_IMAGEN_UWELL_WM_ICE_2"
    ],
    "badge": "NUEVO",
    "description": "Vape desechable UWELL de ultra alta capacidad con tecnología de doble malla y 12000 caladas.",
    "longDescription": "Dispositivo desechable insignia de UWELL, diseñado para longevidad y sabor intenso. Ofrece hasta 12000 caladas, 5% de nicotina y una batería recargable de larga duración. Su bobina dual asegura que cada calada sea potente. Sabor: Sandía dulce con un acabado refrescante de hielo.",
    "isFeatured": true
  },
  {
    "_id": "7",
    "name": "NEXA Vapes 20000 Puffs - Chicago Blueberry Mint",
    "slug": "nexa-vapes-20000-chicago-blueberry-mint",
    "price": 20.00,
    "originalPrice": null,
    "rating": 4.7,
    "reviews": 0,
    "stock": "Disponible",
    "specs": {
      "puffs": "20000",
      "nicotineLevel": "5%",
      "liquidVolume": "20ml",
      "charging": "USB-C",
      "coil": "Dual Mesh Coil",
      "display": "Pantalla LED de Monitoreo",
      "flavor": "Chicago Blueberry Mint"
    },
    "availableColors": 2,
    "imageUrls": [
      "https://tvx45.com/cdn/shop/files/1_12_2024_NEXA_N20000_Disposable_Vape_10__76867.1706743633_1024x1024.jpg?v=1711221934",
      "URL_IMAGEN_NEXA_CBM_2"
    ],
    "badge": "Últimas unidades",
    "description": "Vape desechable NEXA de capacidad extrema con pantalla de visualización y tecnología de doble malla.",
    "longDescription": "El NEXA 20K ofrece hasta 20,000 caladas, impulsado por una bobina dual de malla para sabor y vapor constantes. Contiene 5% de nicotina, batería recargable y una pantalla grande para monitorear el e-líquido y la batería. El sabor Chicago Blueberry Mint combina arándanos maduros con un toque refrescante de menta.",
    "isFeatured": true
  }
  ];

  // Usar productos del backend, o fallback si hay error
  const displayProducts = products.length > 0 ? products : (error ? fallbackProducts : []);
  const featuredProducts = displayProducts.filter(p => p.isFeatured);
  
  // Debug: mostrar información en consola
  useEffect(() => {
    if (products.length > 0) {
      console.log('✅ Productos del backend cargados:', products.length);
      console.log('📋 Primer producto:', products[0]);
    } else if (error) {
      console.warn('⚠️ Usando productos fallback debido a error');
    }
  }, [products, error]);

  useEffect(() => {
    if (!isCarouselPaused && currentView === 'home' && featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCarouselPaused, currentView, featuredProducts.length]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si no hay productos y hay un error
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 mb-4">
            <p className="text-red-400 text-lg font-semibold mb-2">⚠️ Error de conexión</p>
            <p className="text-gray-300">{error}</p>
            <p className="text-gray-400 text-sm mt-4">
              Verifica que el backend esté funcionando en: {process.env.REACT_APP_API_URL || 'https://nebula2-0.onrender.com'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    setUserRating(0);
    setHoverRating(0);
    setSelectedImageIndex(0);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleWhatsAppClick = (productName) => {
    const message = encodeURIComponent(`Hola NEBULA, estoy interesado/a en el producto "${productName}" y me gustaría saber más.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleImageChange = (index) => {
    if (index !== selectedImageIndex) {
      setImageTransition(true);
      setTimeout(() => {
        setSelectedImageIndex(index);
        setTimeout(() => {
          setImageTransition(false);
        }, 50);
      }, 250);
    }
  };

  const renderStars = (rating, interactive = false, size = 16) => {
    const displayRating = interactive ? (hoverRating || userRating) : rating;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={`${
              i < Math.floor(displayRating) 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive ? () => setUserRating(i + 1) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  if (currentView === 'detail' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-slate-900/90"></div>
        </div>

        <nav className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50 border-b border-purple-500/20 relative">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button 
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-white hover:text-purple-400 transition"
              >
                <ArrowLeft size={24} />
                <span className="font-semibold">Volver</span>
              </button>
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white">NEBULA</h1>
                <p className="text-purple-300 text-xs md:text-sm">Smoke Culture</p>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8 relative">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30 overflow-hidden relative">
                <div className="relative w-full h-96 flex items-center justify-center">
                  <img
                    key={selectedImageIndex}
                    src={selectedProduct.imageUrls?.[selectedImageIndex] || selectedProduct.imageUrls?.[0] || selectedProduct.image || ''}
                    alt={selectedProduct.name || 'Producto'}
                    className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 transform ${
                      imageTransition ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              {selectedProduct.imageUrls && selectedProduct.imageUrls.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {selectedProduct.imageUrls.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`group bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-2 border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 ${
                        selectedImageIndex === index 
                          ? 'border-purple-500 shadow-xl shadow-purple-500/50 scale-105 ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900' 
                          : 'border-purple-500/30 hover:border-purple-400/70'
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={imageUrl}
                          alt={`${selectedProduct.name || 'Producto'} - Vista ${index + 1}`}
                          className={`w-full h-20 object-cover transition-all duration-300 ${
                            selectedImageIndex === index ? '' : 'group-hover:scale-110 group-hover:brightness-110'
                          }`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent transition-opacity duration-300 ${
                          selectedImageIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}></div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                {selectedProduct.badge && (
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${
                    selectedProduct.badge === 'NUEVO' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                  }`}>
                    {selectedProduct.badge}
                  </span>
                )}
                <h1 className="text-4xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center gap-4">
                  {renderStars(selectedProduct.rating, false, 20)}
                  <span className="text-gray-300">({selectedProduct.reviews} reseñas)</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">CARACTERÍSTICAS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.specs?.puffs && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <Zap className="text-yellow-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">PUFFS</p>
                        <p className="text-white font-bold">{selectedProduct.specs.puffs}</p>
                      </div>
                    </div>
                  )}
                  {selectedProduct.specs?.nicotineLevel && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <Package className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">NICOTINA</p>
                        <p className="text-white font-bold">{selectedProduct.specs.nicotineLevel}</p>
                      </div>
                    </div>
                  )}
                  {selectedProduct.specs?.liquidVolume && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <Droplets className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">LÍQUIDO</p>
                        <p className="text-white font-bold">{selectedProduct.specs.liquidVolume}</p>
                      </div>
                    </div>
                  )}
                  {selectedProduct.specs?.functions && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">FUNCIONES</p>
                        <p className="text-white font-bold">{selectedProduct.specs.functions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    {selectedProduct.originalPrice && (
                      <p className="text-gray-400 line-through text-lg">${selectedProduct.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="text-5xl font-bold text-white">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Colores disponibles</p>
                    <p className="text-white font-bold text-2xl">{selectedProduct.availableColors}</p>
                  </div>
                </div>
                <p className="text-green-400 font-semibold mb-4">Stock: {selectedProduct.stock}</p>
                
                <button
                  onClick={() => handleWhatsAppClick(selectedProduct.name)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 text-lg shadow-lg"
                >
                  <MessageCircle size={24} />
                  CONSULTAR POR WHATSAPP
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Descripción</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProduct.longDescription}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Tu valoración</h3>
                <div className="flex items-center gap-4">
                  {renderStars(0, true, 32)}
                  {userRating > 0 && (
                    <span className="text-purple-300 font-semibold">
                      {userRating} de 5 estrellas
                    </span>
                  )}
                </div>
                {userRating > 0 && (
                  <p className="text-green-400 text-sm mt-2">¡Gracias por tu valoración!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20NEBULA,%20estoy%20interesado/a%20en%20sus%20productos.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
        >
          <MessageCircle size={32} />
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-slate-900/90"></div>
      </div>

      <nav className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50 border-b border-purple-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">NEBULA</h1>
              <p className="text-purple-300 text-sm">Smoke Culture</p>
            </div>
            <div className="hidden md:flex gap-6 text-white">
              <a href="#" className="hover:text-purple-400 transition font-semibold">Home</a>
              <a href="#productos" className="hover:text-purple-400 transition">Productos</a>
              <a href="#" className="hover:text-purple-400 transition">Nosotros</a>
              <a href="#" className="hover:text-purple-400 transition">Contacto</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Productos Destacados
          </h2>
          
          {featuredProducts.length > 0 && (
            <div 
              className="relative"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {featuredProducts.map((product) => (
                    <div key={product._id} className="w-full flex-shrink-0 px-2">
                      <div 
                        onClick={() => handleProductClick(product)}
                        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer transform hover:scale-105 duration-300"
                      >
                        <div className="grid md:grid-cols-2 gap-8 p-8">
                          <div className="relative flex items-center justify-center bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl p-6">
                            <img
                              src={product.imageUrls?.[0] || product.image}
                              alt={product.name}
                              className="w-full h-96 object-contain rounded-2xl shadow-2xl"
                            />
                            {product.badge && (
                              <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold ${
                                product.badge === 'NUEVO' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                              }`}>
                                {product.badge}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h3>
                            <div className="flex items-center gap-3 mb-4">
                              {renderStars(product.rating, false, 24)}
                              <span className="text-gray-300 text-lg">({product.reviews})</span>
                            </div>
                            <p className="text-gray-300 text-lg mb-6">{product.description}</p>
                            <div className="flex items-center gap-6 mb-6">
                              <div className="text-5xl font-bold text-white">${product.price.toFixed(2)}</div>
                              <div className="text-green-400 font-semibold">{product.stock}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {product.specs?.puffs && (
                                <div className="flex items-center gap-2 text-purple-300">
                                  <Zap size={18} />
                                  <span>{product.specs.puffs} Puffs</span>
                                </div>
                              )}
                              {product.specs?.liquidVolume && (
                                <div className="flex items-center gap-2 text-purple-300">
                                  <Droplets size={18} />
                                  <span>{product.specs.liquidVolume}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight size={32} />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === carouselIndex ? 'w-8 bg-purple-500' : 'w-2 bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div id="productos" className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Todos los productos
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              Descubre nuestra selección de vapes: la opción moderna y segura para disfrutar. 
              Explora sabores únicos y elige el dispositivo ideal.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full">
                {displayProducts.length} productos
              </span>
              <span className="bg-white text-purple-900 px-4 py-2 rounded-full font-semibold">
                Marcas Recomendadas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product)}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                  <img
                    src={product.imageUrls?.[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                  {product.badge && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      product.badge === 'NUEVO' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                  
                  <div className="flex justify-between items-center mb-3">
                    {renderStars(product.rating)}
                    <span className="text-green-400 text-xs font-semibold">{product.stock}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    {product.specs?.puffs && (
                      <div className="flex items-center gap-1 text-purple-300">
                        <Zap size={14} />
                        <span>{product.specs.puffs}</span>
                      </div>
                    )}
                    {product.specs?.liquidVolume && (
                      <div className="flex items-center gap-1 text-purple-300">
                        <Droplets size={14} />
                        <span>{product.specs.liquidVolume}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm block">${product.originalPrice.toFixed(2)}</span>
                      )}
                      <div className="text-2xl font-bold text-white">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="text-purple-300 text-sm font-semibold">Ver más →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20NEBULA,%20estoy%20interesado/a%20en%20sus%20productos.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
      >
        <MessageCircle size={32} />
      </a>

      <footer className="bg-black bg-opacity-50 backdrop-blur-md mt-16 border-t border-purple-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-300">
          <h3 className="text-2xl font-bold text-white mb-2">NEBULA</h3>
          <p className="text-purple-300 mb-4">Smoke Culture</p>
          <p className="text-sm">© 2024 NEBULA. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-purple-400 transition">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition">Facebook</a>
            <a href="#" className="hover:text-purple-400 transition">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;