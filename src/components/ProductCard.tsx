'use client';

import Image from 'next/image';
import { useState } from 'react';

// import ProductModal from './ProductModal';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from './Button';

import ProductModal from './ProductModal';

interface Props {
  product: {
    id: number;
    name: string;
    description: string;
    SKU: string;
    inStock: boolean;
    slug: string;
    images?: { url: string }[] | null;
    priceAtacarejo: number;
    priceAtacado: number;
    minAtacarejoQty: number;
    minAtacadoQty: number;
  };
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card key={product.slug} className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl w-full border-none transform hover:shadow-[0_0_20px_rgba(255,255,255,1)] focus:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-140 overflow-hidden lg:w-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold lg:text-2xl">{product.name}</CardTitle>
          {/* <CardDescription className="text-xm md:text-lg 2xl:text-lg font-medium text-gray-900 mb-2 2xl:mb-1">
            {product.description || ''}
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Image
            src={`https://lumafestasaws.s3.us-east-1.amazonaws.com/uploads/uploads/${product.slug}.png`}
            alt={`Produto ${product.name}`}
            width={400}
            height={400}
            className="flex rounded-2xl object-cover object-center w-full h-85 lg:h-92 lg:w-auto 2xl:h-92 mb-2 2xl:mb-1"
          />
        </CardContent>
        <CardFooter className="flex justify-center s-center rounded-3xl">
          <Button onClick={() => setOpen(true)} className="bg-white text-amber-700 hover:bg-amber-700 hover:text-white focus:bg-amber-700 focus:text-white border-none font-bold py-2 px-8 rounded-3xl transform hover:shadow-[0_0_30px_#9b5300] focus:shadow-[0_0_30px_#9b5300] transition-all ease-in-out duration-300">
            Comprar
          </Button>
        </CardFooter>
      </Card>

      {open && (
        <ProductModal
          product={{
            id: product.id,
            name: product.name,
            description: product.description,
            SKU: product.SKU,
            inStock: product.inStock,
            slug: product.slug,
            qty: 0, // Default value, update as needed
            imageUrl: product.images?.[0]?.url || null,
            priceAtacarejo: product.priceAtacarejo,
            priceAtacado: product.priceAtacado,
            minAtacarejoQty: product.minAtacarejoQty,
            minAtacadoQty: product.minAtacadoQty,
          }}
          isOpen={open}
          onClose={() => setOpen(false)}
          parentSlug={product.slug} // Pass the slug to the modal
        />
      )}
    </>
  );
}

