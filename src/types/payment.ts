export interface PaymentIntent {
  amount: number;
  userId: string;
  reference: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface PaymentVerification {
  orderId: string;
  paymentRef: string;
  amount: number;
  status: 'success' | 'failed';
  timestamp: number;
}