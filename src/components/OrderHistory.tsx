import React from 'react';
import { X, Package } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { formatDate } from '../lib/utils';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { orders } = useOrders();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="absolute right-0 top-0 h-full w-96 bg-background shadow-xl transform transition-transform duration-300">
        <div className="flex justify-between items-center p-6 border-b border-background-card">
          <h2 className="text-2xl font-bold text-white">My Orders</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-card rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-primary hover:text-primary-dark" />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-5rem)] text-text-secondary">
            <Package className="w-12 h-12 mb-4 text-primary/50" />
            <p className="mb-2">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {orders.map(order => (
              <div key={order.id} className="bg-background-card rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-text-secondary">Order ID</p>
                    <p className="text-white font-medium">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-secondary">Date</p>
                    <p className="text-white">{formatDate(order.paymentDetails.timestamp)}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-text-secondary">
                        {item.name} (Size: {item.size})
                      </span>
                      <span className="text-white">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-background">
                  <span className="text-text-secondary">Total</span>
                  <span className="text-primary font-bold">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;