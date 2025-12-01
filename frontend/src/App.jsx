import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Package, Droplets, Zap, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const products = [
    {
      _id: '1',
      name: "Dozo THC-P Sugar Sauce 5 GR",
      slug: "dozo-thc-p-sugar-sauce-5gr",
      price: 50.00,
      rating: 4.5,
      reviews: 24,
      stock: "Disponible",
      specs: { puffs: "25K", nicotineLevel: "50MG", liquidVolume: "18ML", functions: "MED/BOOST" },
      availableColors: 5,
      imageUrls: [
        "https://images.unsplash.com/photo-1590508969892-02fcc63dc1f2?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609006398633-b8e8c6a8f5f1?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609006398915-f0271d3b4d9f?w=600&h=600&fit=crop"
      ],
      badge: "Últimas unidades",
      description: "Experiencia premium de vapeo con tecnología avanzada",
      longDescription: "El Dozo THC-P Sugar Sauce ofrece una experiencia de vapeo incomparable con su fórmula especial de 5 gramos.",
      isFeatured: true
    },
    {
      _id: '2',
      name: "SWF 3tk 40K",
      slug: "swf-3tk-40k",
      price: 30.00,
      rating: 4.8,
      reviews: 89,
      stock: "Disponible",
      specs: { puffs: "40K", nicotineLevel: "35MG", liquidVolume: "20ML", functions: "DUAL MODE" },
      availableColors: 4,
      imageUrls: [
        "https://images.unsplash.com/photo-1609006398633-b8e8c6a8f5f1?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590508969892-02fcc63dc1f2?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=600&fit=crop"
      ],
      badge: "Últimas unidades",
      description: "Potencia y duración excepcional para todo el día",
      longDescription: "Con 40,000 puffs, el SWF 3tk es el compañero perfecto para usuarios intensivos.",
      isFeatured: true
    }
  ];

  const featuredProducts = products.filter(p => p.isFeatured);

  useEffect(() => {
    if (!isCarouselPaused && currentView === 'home' && featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCarouselPaused, currentView, featuredProducts.length]);

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
                    src={selectedProduct.imageUrls?.[selectedImageIndex] || selectedProduct.imageUrls?.[0] || selectedProduct.image}
                    alt={selectedProduct.name}
                    className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 transform ${
                      imageTransition ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                    }`}
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
                          alt={`${selectedProduct.name} - Vista ${index + 1}`}
                          className={`w-full h-20 object-cover transition-all duration-300 ${
                            selectedImageIndex === index ? '' : 'group-hover:scale-110 group-hover:brightness-110'
                          }`}
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
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/30 p-3 rounded-lg">
                      <Zap className="text-yellow-400" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">PUFFS</p>
                      <p className="text-white font-bold">{selectedProduct.specs.puffs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/30 p-3 rounded-lg">
                      <Package className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">NICOTINA</p>
                      <p className="text-white font-bold">{selectedProduct.specs.nicotineLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/30 p-3 rounded-lg">
                      <Droplets className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">LÍQUIDO</p>
                      <p className="text-white font-bold">{selectedProduct.specs.liquidVolume}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/30 p-3 rounded-lg">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">FUNCIONES</p>
                      <p className="text-white font-bold">{selectedProduct.specs.functions}</p>
                    </div>
                  </div>
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
                              <div className="flex items-center gap-2 text-purple-300">
                                <Zap size={18} />
                                <span>{product.specs.puffs} Puffs</span>
                              </div>
                              <div className="flex items-center gap-2 text-purple-300">
                                <Droplets size={18} />
                                <span>{product.specs.liquidVolume}</span>
                              </div>
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
                {products.length} productos
              </span>
              <span className="bg-white text-purple-900 px-4 py-2 rounded-full font-semibold">
                Marcas Recomendadas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
                    <div className="flex items-center gap-1 text-purple-300">
                      <Zap size={14} />
                      <span>{product.specs.puffs}</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-300">
                      <Droplets size={14} />
                      <span>{product.specs.liquidVolume}</span>
                    </div>
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