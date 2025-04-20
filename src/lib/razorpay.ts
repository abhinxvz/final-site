declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const initializeRazorpayPayment = (
  amount: number,
  customerDetails: CustomerDetails,
  items: any[],
  onSuccess: (paymentDetails: { paymentId: string; timestamp: number }) => void,
  onError: (error: any) => void
) => {
  const options = {
    key: 'rzp_live_Wo6Eq2s1nNcJBi',
    amount: amount * 100, 
    name: 'ALTAIRA',
    description: 'Fashion Purchase',
    image: 'https://i.postimg.cc/Hsbf9bgg/altaira2.png',
    prefill: {
      name: customerDetails.name,
      email: customerDetails.email,
      contact: customerDetails.phone,
    },
    notes: {
      address: customerDetails.address,
      order_id: Date.now().toString(),
      items: JSON.stringify(items),
    },
    theme: {
      color: '#ef4444',
    },
    handler: function (response: any) {
      if (response.razorpay_payment_id) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          timestamp: Date.now(),
        });
      } else {
        onError(new Error('Payment verification failed'));
      }
    },
    modal: {
      ondismiss: function() {
        onError(new Error('Payment cancelled by user'));
      },
      escape: false,
      backdropClose: false
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', function (response: any) {
    onError(response.error || new Error('Payment failed'));
  });
  
  rzp.open();
};

export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById('razorpay-sdk');
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.Razorpay) {
        resolve();
      } else {
        reject(new Error('Razorpay SDK not loaded'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay SDK'));
    };

    document.head.appendChild(script);
  });
};