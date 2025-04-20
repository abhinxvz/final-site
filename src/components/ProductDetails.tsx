import React, { useState } from 'react';
import { X, ShoppingBag, Truck, Shield, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
  selectedSize,
  onSizeChange,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeGuide = {
    XS: { chest: "34-36", length: "26", shoulder: "15" },
    S: { chest: "36-38", length: "27", shoulder: "16" },
    M: { chest: "38-40", length: "28", shoulder: "17" },
    L: { chest: "40-42", length: "29", shoulder: "18" },
    XL: { chest: "42-44", length: "30", shoulder: "19" },
    XXL: { chest: "44-46", length: "31", shoulder: "20" },
  };

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'sizing', label: 'Size Guide' },
    { id: 'care', label: 'Care' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'features', label: 'Features' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-background rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-background-card">
          <h2 className="text-xl font-bold text-white">{product.name}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-background-card rounded-full transition-colors"
          >
            <X className="text-primary hover:text-primary-dark w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full rounded-lg"
            />
            <div className="flex flex-col items-center space-y-3">
              <span className="text-primary text-2xl font-bold">₹{product.price}</span>
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="w-full bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-3 border-b border-background-card overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-1.5 px-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 h-[calc(90vh-20rem)] overflow-y-auto text-sm">
              {activeTab === 'details' && (
                <div className="text-text-secondary space-y-3">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>• 100% Premium Cotton</div>
                    <div>• Oversized Fit</div>
                    <div>• Digital Print</div>
                    <div>• Pre-shrunk</div>
                    <div>• Ribbed Neck</div>
                    <div>• Double-stitched</div>
                  </div>
                </div>
              )}

              {activeTab === 'sizing' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-primary text-white'
                            : 'bg-background-card text-text-secondary hover:bg-background-card/80'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-text-secondary border-b border-background-card">
                        <th className="py-1.5 text-left">Size</th>
                        <th className="py-1.5 text-left">Chest</th>
                        <th className="py-1.5 text-left">Length</th>
                        <th className="py-1.5 text-left">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(sizeGuide).map(([size, measurements]) => (
                        <tr key={size} className="text-text-secondary border-b border-background-card">
                          <td className="py-1.5">{size}</td>
                          <td className="py-1.5">{measurements.chest}"</td>
                          <td className="py-1.5">{measurements.length}"</td>
                          <td className="py-1.5">{measurements.shoulder}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="text-text-secondary grid grid-cols-2 gap-2">
                  <div>• Machine wash cold</div>
                  <div>• Wash inside out</div>
                  <div>• No bleach</div>
                  <div>• Tumble dry low</div>
                  <div>• Iron on low heat</div>
                  <div>• No dry clean</div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-background-card rounded">
                    <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Free Standard Shipping</p>
                      <p className="text-text-secondary text-xs">5-7 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-background-card rounded">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">30-Day Returns</p>
                      <p className="text-text-secondary text-xs">Easy returns for unworn items</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-background-card rounded">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Premium Quality</p>
                      <p className="text-text-secondary text-xs">Expert craftsmanship</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-text-secondary">
                    <div>• Reinforced seams</div>
                    <div>• Breathable fabric</div>
                    <div>• UV protection</div>
                    <div>• Anti-wrinkle</div>
                    <div>• Quick-dry tech</div>
                    <div>• Tagless design</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;