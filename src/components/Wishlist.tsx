import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = (item: any) => {
    addToCart(item.id, item.name, item.price, 'M');
    removeFromWishlist(item.id);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="absolute right-0 top-0 h-full w-96 bg-background shadow-xl transform transition-transform duration-300">
        <div className="flex justify-between items-center p-6 border-b border-background-card">
          <h2 className="text-2xl font-bold text-white">Wishlist</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-card rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-primary hover:text-primary-dark" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-5rem)] text-text-secondary">
            <p className="mb-2">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {items.map(item => (
              <div key={item.id} className="bg-background-card rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">₹{item.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 hover:bg-background rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-text-secondary hover:text-primary" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;