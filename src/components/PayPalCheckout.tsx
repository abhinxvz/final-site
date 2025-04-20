import React from 'react';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../hooks/useCheckout';
import { CheckoutButton } from './checkout/CheckoutButton';
import { EmptyCartMessage } from './checkout/EmptyCartMessage';
import { QRCode } from './checkout/QRCode';

interface PaymentCheckoutProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({ onSuccess, onError }) => {
  const { items, cartTotal } = useCart();
  const { handleCheckout, isProcessing } = useCheckout({
    items,
    cartTotal,
    onSuccess,
    onError
  });

  return (
    <div className="space-y-6">
      <QRCode amount={cartTotal} />
      <div className="flex gap-2">
        <CheckoutButton 
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
          disabled={items.length === 0}
          icon="paytm"
        />
        <CheckoutButton 
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
          disabled={items.length === 0}
          icon="gpay"
        />
      </div>
      {items.length === 0 && <EmptyCartMessage />}
    </div>
  );
};

export default PaymentCheckout;