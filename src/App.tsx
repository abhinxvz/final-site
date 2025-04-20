import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import About from './components/About';
import Newsletter from './components/Newsletter';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NewsletterProvider } from './context/NewsletterContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { products } from './data/products';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
  const [showAnnouncement, setShowAnnouncement] = React.useState(true);

  const handleNewsletter = (email: string) => {
    console.log(`Welcome offer sent to ${email}`);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <NewsletterProvider>
              <div className="min-h-screen bg-background flex flex-col relative overflow-hidden rounded-xl">
                {/* Red glow effects at the corners */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>
                
                {showAnnouncement && (
                  <div className="fixed w-full z-50 top-0 bg-primary/90 backdrop-blur-sm text-white py-3 px-4">
                    <div className="container mx-auto flex items-center justify-between">
                      <div className="flex-1" />
                      <p className="text-center font-extrabold text-sm flex-grow">
                        GET <span className="mx-2 text-black">15% OFF</span> WITH "REDME"{' '}
                        <span className="mx-2 text-black">RAISE THE BOLD ENERGY</span> 🚀
                      </p>
                      <button
                        onClick={() => setShowAnnouncement(false)}
                        className="flex-1 flex justify-end"
                      >
                        <X className="w-5 h-5 hover:rotate-90 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                <div className={showAnnouncement ? 'mt-12' : ''}>
                  <Navbar />
                </div>

                <div className="w-full h-screen">
                  <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full"
                  >
                    <SwiperSlide>
                      <div className="w-full h-full relative overflow-hidden">
                        <img 
                          src="https://i.postimg.cc/pTCXyrr7/asd.png?q=80&w=2070&auto=format&fit=crop" 
                          alt="Athletic Banner 1" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white px-4">
                            <h2 className="font-quantum text-6xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"></h2>
                            <p className="font-quantum text-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"></p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="w-full h-full relative overflow-hidden">
                        <img 
                          src="https://stunnervision.com/cdn/shop/files/crossfade-outnow_1800x.jpg?v=1724500971&q=80&w=2070&auto=format&fit=crop" 
                          alt="Athletic Banner 2" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white px-4">
                            <h2 className="font-quantum text-6xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"></h2>
                            <p className="font-quantum text-6xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">DARE TO RISE </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                
                <main className="flex-grow">
                  <div className="relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                      style={{ 
                        backgroundImage: 'url("https://i.redd.it/k4tdfzcibgea1.jpg")',
                        backgroundAttachment: 'fixed'
                      }}
                    />
                    <div className="container mx-auto px-4 py-16 relative">
                      <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full backdrop-blur-sm">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">Premium Collection</span>
                        </div>
                        <h1 className="font-quantum text-3xl font-bold text-red-500 tracking-wider hover:text-white transition-colors duration-300 ease-in-out">
                          VISION
                        </h1>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <About />
                  <Newsletter onSubscribe={handleNewsletter} />
                </main>

                <footer className="relative border-t border-primary/10">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                    style={{ 
                      backgroundImage: 'url("https://i.redd.it/k4tdfzcibgea1.jpg")',
                      backgroundAttachment: 'fixed'
                    }}
                  />
                  <div className="container mx-auto px-4 py-8 relative flex justify-center items-center">
                    <div className="text-center space-y-2 max-w-xs mx-auto">
                      <div className="text-primary font-quantum font-extrabold text-lg">
                        &copy; 2025 ALTAIRA&reg;
                      </div>
                      <div className="text-primary/80 font-extrabold text-sm">
                        All rights reserved.
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </NewsletterProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;