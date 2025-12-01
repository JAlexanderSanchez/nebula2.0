import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Package, Droplets, Zap, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from './services/api';

const WHATSAPP_NUMBER = '5938456454';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getAllProducts();
        
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          setError('No se pudieron cargar los productos');
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        "https://cliccloud.co/empresas/productos-600/clic-v2-Q7ffOgbcCGYVwquphEO2-2025-10-10.png"
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
        "https://cdn11.bigcommerce.com/s-5zbebjcuob/images/stencil/1280x1280/products/7194/18501/GR010604-1__65963.1696937320.jpg?c=2"
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
        "https://vapecraftinc.com/media/amasty/webp/catalog/product/cache/9af08a49c64f622a3ecfb8ecadcd8f84/y/o/yogi-bar-8000-disposable-vape_jpg.webp"
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
        "https://cliccloud.co/empresas/productos-600/clic-v2-Q7ffOgbcCGYVwquphEO2-2025-10-10.png"
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
        "https://westcoastvapesupply.com/cdn/shop/articles/The_Strio_EBCreate_XC6500_Disposable_Vape_Flavor_Review.jpg?v=1712899037&width=700"
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
        "https://nubedensa.com/wp-content/uploads/2025/09/482222602_1912744686167799_3594784751135893163_n-700x700.webp.jpg"
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
        "https://tvx45.com/cdn/shop/files/1_12_2024_NEXA_N20000_Disposable_Vape_10__76867.1706743633_1024x1024.jpg?v=1711221934"
      ],
      "badge": "Últimas unidades",
      "description": "Vape desechable NEXA de capacidad extrema con pantalla de visualización y tecnología de doble malla.",
      "longDescription": "El NEXA 20K ofrece hasta 20,000 caladas, impulsado por una bobina dual de malla para sabor y vapor constantes. Contiene 5% de nicotina, batería recargable y una pantalla grande para monitorear el e-líquido y la batería. El sabor Chicago Blueberry Mint combina arándanos maduros con un toque refrescante de menta.",
      "isFeatured": true
    }
  ];

  const displayProducts = products.length > 0 ? products : (error ? fallbackProducts : []);
  const featuredProducts = displayProducts.filter(p => p.isFeatured);

  useEffect(() => {
    if (!isCarouselPaused && currentView === 'home' && featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCarouselPaused, currentView, featuredProducts.length]);

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

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 mb-4">
            <p className="text-red-400 text-lg font-semibold mb-2">⚠️ Error de conexión</p>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Reintentar
            </button>
          </div>
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

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 relative">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-4 sm:p-8 border border-purple-500/30 overflow-hidden relative">
                <div className="relative w-full aspect-square bg-white rounded-2xl flex items-center justify-center p-4 sm:p-8 shadow-2xl">
                  <img
                    key={selectedImageIndex}
                    src={selectedProduct.imageUrls?.[selectedImageIndex] || selectedProduct.imageUrls?.[0] || selectedProduct.image || ''}
                    alt={selectedProduct.name || 'Producto'}
                    className={`w-full h-full object-contain transition-all duration-500 transform ${
                      imageTransition ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    loading="eager"
                  />
                </div>
              </div>
              
              {selectedProduct.imageUrls && selectedProduct.imageUrls.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                  {selectedProduct.imageUrls.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`group bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-lg sm:rounded-xl p-1 sm:p-2 border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 ${
                        selectedImageIndex === index 
                          ? 'border-purple-500 shadow-xl shadow-purple-500/50 scale-105 ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900' 
                          : 'border-purple-500/30 hover:border-purple-400/70'
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-md bg-white aspect-square flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={`${selectedProduct.name || 'Producto'} - Vista ${index + 1}`}
                          className={`w-full h-full object-contain p-1 transition-all duration-300 ${
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

            <div className="space-y-4 sm:space-y-6">
              <div>
                {selectedProduct.badge && (
                  <span className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs font-bold mb-2 sm:mb-3 ${
                    selectedProduct.badge === 'NUEVO' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                  }`}>
                    {selectedProduct.badge}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {renderStars(selectedProduct.rating, false, 18)}
                  <span className="text-gray-300 text-sm sm:text-base">({selectedProduct.reviews} reseñas)</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">CARACTERÍSTICAS</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                  {/* Agregando las especificaciones que faltaban en el fragmento original */}
                  {selectedProduct.specs?.battery && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <Zap className="text-green-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">BATERÍA</p>
                        <p className="text-white font-bold">{selectedProduct.specs.battery}</p>
                      </div>
                    </div>
                  )}
                  {selectedProduct.specs?.coil && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-3 rounded-lg">
                        <Zap className="text-pink-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">RESISTENCIA</p>
                        <p className="text-white font-bold">{selectedProduct.specs.coil}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                  <div>
                    {selectedProduct.originalPrice && (
                      <p className="text-gray-400 line-through text-base sm:text-lg">${selectedProduct.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="text-4xl sm:text-5xl font-bold text-white">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-gray-400 text-xs sm:text-sm">Colores disponibles</p>
                    <p className="text-white font-bold text-xl sm:text-2xl">{selectedProduct.availableColors}</p>
                  </div>
                </div>
                <p className="text-green-400 font-semibold mb-4 text-sm sm:text-base">Stock: {selectedProduct.stock}</p>
                
                <button
                  onClick={() => handleWhatsAppClick(selectedProduct.name)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 text-base sm:text-lg shadow-lg"
                >
                  <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                  CONSULTAR POR WHATSAPP
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Descripción</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedProduct.longDescription}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Tu valoración</h3>
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
        >
          <MessageCircle size={28} className="sm:w-8 sm:h-8" />
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-slate-900/90"></div>
      </div>

      {/* --- Navegación Principal --- */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50 border-b border-purple-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">NEBULA 🌌</h1>
            <p className="text-purple-300 text-sm md:text-base font-medium mt-1">Vapes Desechables de Alto Rendimiento</p>
          </div>
        </div>
      </nav>
      {/* --- Fin Navegación Principal --- */}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 relative z-10">

        {/* --- Carrusel de Productos Destacados (Featured) --- */}
        {featuredProducts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-b border-purple-500/50 pb-2">✨ Destacados del Mes</h2>
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {featuredProducts.map((product, index) => (
                  <div key={product._id} className="w-full flex-shrink-0" onClick={() => handleProductClick(product)}>
                    <div className="grid md:grid-cols-2 bg-gradient-to-br from-purple-800/70 to-pink-800/70 backdrop-blur-md p-6 sm:p-10 cursor-pointer hover:bg-purple-700/80 transition duration-300">
                      
                      {/* Imagen */}
                      <div className="order-2 md:order-1 flex items-center justify-center p-4">
                        <img 
                          src={product.imageUrls?.[0] || product.image || ''} 
                          alt={product.name} 
                          className="w-full max-w-xs h-auto object-contain transition-transform duration-500 transform hover:scale-105"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>

                      {/* Info */}
                      <div className="order-1 md:order-2 text-white space-y-3 sm:space-y-4 flex flex-col justify-center">
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                          product.badge === 'NUEVO' ? 'bg-red-500' : 'bg-yellow-400 text-black'
                        }`}>
                          {product.badge}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-extrabold">{product.name}</h3>
                        <p className="text-purple-200 text-base sm:text-lg">{product.description}</p>
                        
                        <div className="flex items-center gap-4">
                          {renderStars(product.rating)}
                          <span className="text-gray-200 text-sm">({product.reviews} reseñas)</span>
                        </div>
                        
                        <p className="text-4xl font-bold text-yellow-400 mt-2">${product.price.toFixed(2)}</p>
                        
                        <button
                          onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                          className="mt-4 bg-white text-purple-900 font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-gray-200 transition-colors max-w-fit"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles del Carrusel */}
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition hidden md:block"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition hidden md:block"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicadores de Posición */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      carouselIndex === index ? 'bg-white w-5' : 'bg-gray-400/50'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* --- Fin Carrusel --- */}
        <hr className="border-purple-500/20 my-10" />

        {/* --- Listado de Todos los Productos --- */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 border-b border-purple-500/50 pb-2">Todos los Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {displayProducts.map((product) => (
              <div 
                key={product._id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-purple-500/20 shadow-xl shadow-slate-900/50 hover:border-purple-400 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                onClick={() => handleProductClick(product)}
              >
                {/* Badge y Stock */}
                <div className="flex justify-between items-start mb-3">
                  {product.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.badge === 'NUEVO' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <span className="text-green-400 text-sm font-semibold">{product.stock}</span>
                </div>

                {/* Imagen */}
                <div className="w-full aspect-square bg-white rounded-xl mb-4 flex items-center justify-center p-4">
                  <img 
                    src={product.imageUrls?.[0] || product.image || ''} 
                    alt={product.name} 
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Detalles */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-gray-400 text-xs">({product.reviews})</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="text-2xl font-extrabold text-yellow-400">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppClick(product.name); }}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {displayProducts.length === 0 && !error && (
            <div className="text-center py-10">
                <p className="text-gray-400 text-xl">No hay productos para mostrar en este momento.</p>
            </div>
          )}
        </section>
        {/* --- Fin Listado de Productos --- */}
      </main>

      {/* --- Botón Flotante de WhatsApp --- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20NEBULA,%20estoy%20interesado/a%20en%20sus%20productos.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
      >
        <MessageCircle size={28} className="sm:w-8 sm:h-8" />
      </a>
    </div>
  );
}

export default App;