import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  stock?: number;
  rating?: number;

  category:
    | string
    | {
        _id: string;
        name: string;
      };

  images?: {
    url: string;
    publicId?: string;
  }[];
};

type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rma_cart");
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("rma_cart", JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (product, qty = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product._id === product._id);
      if (existing) {
        return current.map((item) =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...current, { product, qty }];
    });
  };

  const remove: CartCtx["remove"] = (id) => {
    setItems((current) => current.filter((item) => item.product._id !== id));
  };

  const setQty: CartCtx["setQty"] = (id, qty) => {
    setItems((current) =>
      current.map((item) =>
        item.product._id === id
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.qty * item.product.price, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};