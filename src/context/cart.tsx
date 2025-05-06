'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  inStock: boolean;
  minAtacarejoQty: number;
  minAtacadoQty: number;
  priceAtacado: number;
  priceAtacarejo: number;
  SKU: string;
  imageUrl: string | null;
  qty: number;
}

interface CartContextValue {
  isOpen: boolean;
  items: CartItem[];
  openCart(): void;
  closeCart(): void;
  addItem(item: CartItem): void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  function openCart() { setOpen(true); }
  function closeCart() { setOpen(false); }
  function addItem(item: CartItem) {
    setItems((cur) => {
      const idx = cur.findIndex((i) => i.id === item.id);
      if (idx > -1) {
        const copy = [...cur];
        copy[idx].qty += item.qty;
        return copy;
      }
      return [...cur, item];
    });
  }

  return (
    <CartContext.Provider value={{ isOpen, items, openCart, closeCart, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}