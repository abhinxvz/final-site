import React, { useState } from 'react';
import { ShoppingCart, Menu, User, Heart, Package } from 'lucide-react';
import Cart from './Cart';
import CreativeMenu from './Menu/CreativeMenu';
import Wishlist from './Wishlist';
import OrderHistory from './OrderHistory';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from './auth/login-form';
import { Button } from './ui/button';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-black border-b border-red-500 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group"
            >
              <Menu className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="flex-1 flex justify-center items-center mx-auto">
              <h1 className="font-quantum text-3xl font-bold text-red-500 tracking-wider text-center absolute left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full bg-gradient-to-r from-transparent via-red-900/10 to-transparent border-x border-red-500/20">ALTAIRA</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOrdersOpen(true)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Package className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsWishlistOpen(true)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="text-red-500 hover:text-red-400"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-red-500 hover:text-red-400"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              <div className="relative group">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6 text-red-500 cursor-pointer transform transition-transform group-hover:scale-110" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CreativeMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <OrderHistory isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      {isLoginOpen && (
        <LoginForm onClose={() => setIsLoginOpen(false)} />
      )}
    </>
  );
}

export default Navbar;