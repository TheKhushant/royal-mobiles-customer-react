import { createContext, useContext, useState, type ReactNode } from "react";

type CartProviderProps = {
  children: ReactNode;
};

type CartContextValue = {
  items: any[];
  addItem: (item: any) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<any[]>([]);

  const addItem = (item: any) => {
    setItems((prev) => [...prev, item]);
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
