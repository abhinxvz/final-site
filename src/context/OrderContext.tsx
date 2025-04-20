import React, { createContext, useContext, useState } from 'react';
import { Order } from '../types/order';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(currentOrders => [...currentOrders, order]);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}