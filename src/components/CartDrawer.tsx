// src/components/CartDrawer.tsx
'use client';
import { useCart } from '@/context/cart';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion } from 'framer-motion'; // opcional p/ animações

export default function CartDrawer() {
  const { isOpen, closeCart, items } = useCart();

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* painel */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-xl z-50 flex flex-col"
      >
        <header className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Seu Carrinho</h2>
          <button onClick={closeCart} aria-label="Fechar carrinho">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                {/* Exemplo, se tiver imagem */}
                {/* <Image src={item.image} width={48} height={48} alt={item.name} /> */}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.qty} × R$ {item.priceAtacado.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="p-4 border-t">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => {
              /* chamar método de checkout (abrir WhatsApp etc) */
            }}
          >
            Finalizar Pedido
          </button>
        </footer>
      </motion.aside>
    </>
  );
}
