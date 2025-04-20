export interface Order {
  id: string;
  userId: string | null;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'pending' | 'failed';
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentDetails: {
    paymentId: string;
    method: string;
    timestamp: number;
  };
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
}