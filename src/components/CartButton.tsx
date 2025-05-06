// src/components/CartButton.tsx
'use client';
import { useCart } from '@/context/cart';
import { ShoppingCart } from 'lucide-react';

import Button from './Button';

export default function CartButton() {
  const { openCart } = useCart();
  return (
    <Button
      className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow hover:bg-gray-100"
      onClick={openCart}
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="h-6 w-6 text-gray-800" />
    </Button>
  );
}
