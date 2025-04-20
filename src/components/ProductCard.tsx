import React, { useState } from 'react';
import { ShoppingBag, Info, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductDetails from './ProductDetails';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [showDetails, setShowDetails] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    addToCart(product.id, product.name, product.price, selectedSize);
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <div className="bg-background-card rounded-2xl overflow-hidden shadow-lg shadow-black/20 hover-card">
        <div className="relative group">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-2 bg-white/5 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/20 group-hover:bg-white/10 z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isInWishlist(product.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-white/50 group-hover:text-white'
              }`}
            />
          </button>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-4 scale-90 group-hover:scale-100 transition-transform duration-300">
              <button 
                onClick={handleAddToCart}
                className="btn-primary flex items-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => setShowDetails(true)}
                className="bg-white text-black px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
          <p className="text-text-secondary text-sm mb-4">{product.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-white'
                    : 'bg-background text-text-secondary hover:bg-background-card'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">₹{product.price}</span>
            <span className="text-xs uppercase text-text-secondary">Free Shipping</span>
          </div>
        </div>
      </div>

      <ProductDetails 
        product={product}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default ProductCard;