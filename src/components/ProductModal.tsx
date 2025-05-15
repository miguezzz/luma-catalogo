// components/ProductModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useCart } from '@/context/cart';
import { toast, Toaster } from "sonner"

interface Product {
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

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose(): void;
  parentSlug: string;
}

export default function ProductModal({ product, isOpen, onClose, parentSlug }: ProductModalProps) {
  const { addItem } = useCart();
  const [mode, setMode] = useState<'atacarejo' | 'atacado'>('atacarejo');
  const [qty, setQty] = useState(1);

  // Ajusta qty mínimo ao abrir/modal mudar modo
  useEffect(() => {
    const min = mode === 'atacarejo'
      ? product.minAtacarejoQty
      : product.minAtacadoQty;
    setQty(min);
  }, [mode, product.minAtacarejoQty, product.minAtacadoQty, isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-[0_0_20px_rgba(255,255,255,1)] relative h-11/12">
          {/* close */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

          {/* conteúdo */}
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <img
            src={`https://lumafestas.s3.sa-east-1.amazonaws.com/uploads/${parentSlug}.png`}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-7/12 object-cover rounded-lg mb-4"
          />


          <div className="flex flex-col justify-center mb-4">
            <p className="text-bold text-gray-600">
              Preço Atacarejo: R$ {product.priceAtacarejo.toFixed(2)} (mín {product.minAtacarejoQty})
            </p>
            <p className="text-bold text-gray-600">
              Preço Atacado: R$ {product.priceAtacado.toFixed(2)} (mín {product.minAtacadoQty})
            </p>
          </div>

          {/* escolha de modo e quantidade */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="mode"
                className="form-radio accent-amber-800"
                checked={mode === 'atacarejo'}
                onChange={() => setMode('atacarejo')}
              />
              <span>Varejo</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="mode"
                className="form-radio accent-amber-800"
                checked={mode === 'atacado'}
                onChange={() => setMode('atacado')}
              />
              <span>Atacado</span>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Quantidade</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              min={mode === 'atacarejo' ? product.minAtacarejoQty : product.minAtacadoQty}
              step={mode === 'atacarejo' ? product.minAtacarejoQty : product.minAtacadoQty}
              value={qty}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                const min = mode === 'atacarejo'
                  ? product.minAtacarejoQty
                  : product.minAtacadoQty;
                setQty(val < min ? min : val);
              }}
            />
          </div>

          <button
            className="w-full bg-amber-600 text-white hover:bg-pink-400 hover:text-white border-none font-bold py-2 px-8 rounded-3xl transform hover:shadow-[0_0_30px_#ff5bef] transition-all ease-in-out duration-300"
            onClick={() => {
              toast("Produtos adicionado(s ao carrinho!")
              addItem({
                id: product.id,
                name: product.name,
                price: mode === 'atacarejo'
                  ? product.priceAtacarejo
                  : product.priceAtacado,
                qty,
                slug: product.slug,
                description: product.description,
                inStock: product.inStock,
                minAtacarejoQty: product.minAtacarejoQty,
                minAtacadoQty: product.minAtacadoQty,
                SKU: product.SKU,
                imageUrl: product.imageUrl,
              });
              onClose();
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
