import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (id: number, name: string, price: number, size: string) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (id: number, name: string, price: number, size: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === id && item.size === size);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { id, name, price, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}