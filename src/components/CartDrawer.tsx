// src/components/CartDrawer.tsx
'use client';
import { useCart } from '@/context/cart';
import { buildWhatsAppMessage } from '@/utils/whatsapp';
import { Phone } from 'lucide-react';

import Image from 'next/image';
import { X } from 'lucide-react';
import { motion } from 'framer-motion'; // opcional p/ animações

export default function CartDrawer() {
  const { isOpen, closeCart, items } = useCart();
  const phone = '5511974880794';

  function handleCheckout() {
    if (items.length === 0) return;
    const text = buildWhatsAppMessage(items, phone);
    const url = `https://wa.me/${phone}?text=${text}`;
    // abre o chat num nova aba/janela
    window.open(url, '_blank');
  }

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
          <h2 className="text-lg font-semibold 2xl:text-3xl">Seu Carrinho</h2>
          <button onClick={closeCart} aria-label="Fechar carrinho">
            <X className="h-5 w-5 2xl:h-9 2xl:w-9 text-gray-600" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 2xl:text-2xl">Seu carrinho está vazio.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                {/* Exemplo, se tiver imagem */}
                {/* <Image src={item.imageUrl || '/placeholder.png'} width={48} height={48} alt={item.name} /> */}
                <div className="flex-1">
                  <p className="font-medium 2xl:text-2xl">{item.name}</p>
                  <p className="text-sm text-gray-600 2xl:text-xl">
                    {item.qty} Unidades × R$ {item.price.toFixed(2)} = R$ {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">
              R$ {items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
            </span>
          </div>
          <button
            className="w-full bg-amber-600 text-white hover:bg-pink-400 hover:text-white border-none font-bold py-2 px-8 rounded-3xl transform hover:shadow-[0_0_30px_#ff5bef] transition-all ease-in-out duration-300"
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>
        </footer>
      </motion.aside>
    </>
  );
}
