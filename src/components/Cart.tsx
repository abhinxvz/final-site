import React, { useState } from 'react';
import { X, ChevronRight, Check, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import CustomerForm from './CustomerForm';
import { initializeRazorpayPayment, loadRazorpayScript } from '../lib/razorpay';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const applyCoupon = () => {
    if (!couponCode) {
      setError('Please enter a coupon code');
      return;
    }

    if (couponCode.toUpperCase() === 'REDME') {
      const discount = cartTotal * 0.15; // 15% discount
      setDiscountAmount(discount);
      setAppliedCoupon('REDME');
      setError(null);
      setCouponCode('');
    } else {
      setError('Invalid coupon code');
      setDiscountAmount(0);
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setError(null);
  };

  // Calculate final total after discount
  const finalTotal = cartTotal - discountAmount;

  const handleCustomerSubmit = async (customerDetails: any) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      await loadRazorpayScript();
      
      initializeRazorpayPayment(
        finalTotal, // Use the discounted total
        customerDetails,
        items,
        (paymentDetails) => {
          // Create new order
          const order = {
            id: `ORD-${Date.now()}`,
            userId: user?.email || null,
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
            })),
            total: finalTotal, // Use the discounted total
            discount: discountAmount,
            couponApplied: appliedCoupon,
            status: 'completed' as const,
            customerDetails,
            paymentDetails: {
              paymentId: paymentDetails.paymentId,
              method: 'razorpay',
              timestamp: paymentDetails.timestamp,
            },
          };

          addOrder(order);
          clearCart();
          setShowCustomerForm(false);
          onClose();
          alert('Order placed successfully! Thank you for shopping with us.');
        },
        (error) => {
          console.error('Payment failed:', error);
          setError(error.message || 'Payment failed. Please try again.');
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Error initializing payment:', error);
      setError('Could not initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="absolute right-0 top-0 h-full w-96 bg-background shadow-xl transform transition-transform duration-300">
        <div className="flex justify-between items-center p-6 border-b border-background-card">
          <h2 className="text-2xl font-bold text-white">Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-card rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-primary hover:text-primary-dark" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 m-4 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-5rem)] text-text-secondary">
            <p className="mb-2">Your cart is empty</p>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              Continue Shopping
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 p-6">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-start bg-background-card p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-text-secondary">Size: {item.size}</p>
                    <p className="font-bold mt-2 text-primary">₹{item.price} × {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-background rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-text-secondary hover:text-primary" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Coupon Code Section */}
            <div className="px-6 pb-2">
              <div className="mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-white">Apply Coupon Code</span>
              </div>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <div>
                      <p className="text-white text-sm font-medium">{appliedCoupon}</p>
                      <p className="text-xs text-green-400">15% discount applied</p>
                    </div>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 input-field h-10 text-sm"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            
            <div className="border-t border-background-card p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Subtotal:</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-green-400">
                    <span>Discount ({appliedCoupon}):</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                  <span className="font-bold text-lg text-white">Total:</span>
                  <span className="font-bold text-lg text-primary">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setShowCustomerForm(true)}
                className="w-full btn-primary"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
      {showCustomerForm && (
        <CustomerForm
          onSubmit={handleCustomerSubmit}
          onCancel={() => {
            setShowCustomerForm(false);
            setError(null);
          }}
          total={finalTotal}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default Cart;