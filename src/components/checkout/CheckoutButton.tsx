import React from 'react';
import { IndianRupee } from 'lucide-react';

interface CheckoutButtonProps {
  onCheckout: () => void;
  isProcessing: boolean;
  disabled: boolean;
  icon: 'paytm' | 'gpay';
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onCheckout,
  isProcessing,
  disabled,
  icon
}) => {
  const getButtonStyle = () => {
    if (icon === 'paytm') {
      return 'bg-blue-500 hover:bg-blue-600';
    }
    return 'bg-green-500 hover:bg-green-600';
  };

  return (
    <button
      onClick={onCheckout}
      disabled={isProcessing || disabled}
      className={`flex-1 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
        isProcessing || disabled
          ? 'bg-gray-600 cursor-not-allowed'
          : getButtonStyle()
      }`}
    >
      <IndianRupee className="w-4 h-4" />
      {isProcessing ? 'Processing...' : icon === 'paytm' ? 'Pay with Paytm' : 'Pay with GPay'}
    </button>
  );
};