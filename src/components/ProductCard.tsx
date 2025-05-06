'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ProductModal from './ProductModal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from './Button';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card key={product.slug} className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-sm border-none transform hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-140 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">{product.name}</CardTitle>
        <CardDescription className="text-xm text-shadow-sm text-gray-500 mb-2">
          {product.description || ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={
            product.images?.[0]?.url
              ? `https://luma-catalogo-strapi-production.up.railway.app${product.images[0].url}`
              : `https://picsum.photos/400`
          }
          alt={`Produto ${product.name}`}
          width={400}
          height={400}
          className="flex rounded-2xl object-cover object-center w-full h-85 mb-2"
        />
      </CardContent>
      <CardFooter className="flex justify-center s-center rounded-3xl">
        <Button className="bg-white text-amber-700 hover:bg-amber-700 hover:text-white border-none font-bold py-2 px-8 rounded-3xl transform hover:shadow-[0_0_30px_#9b5300] transition-all ease-in-out duration-300">

          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}

