import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import qs from "qs";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ProductCard from '@/components/ProductCard';
// import CategoryCard from '@/components/CategoryCard';

interface IProductItem {
  id: number,
  name: string,
  slug: string,
  SKU: string,
  inStock: boolean,
  minAtacarejoQty: number,
  minAtacadoQty: number,
  priceAtacarejo: number,
  priceAtacado: number,
  description: string,
  images: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
};

interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { url: string };
}

interface ICategoryPageData {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { url: string };
  categories: ICategoryItem[];
  products: IProductItem[];
}

// async function getCategoryItems(category: string) {
//   const data = await fetch(`https://luma-catalogo-strapi-production.up.railway.app/api/products?filters[category][slug][$eq]=${category}&populate=*&pagination[pageSize]=50`);
//   const categoryItems = await data.json();

//   console.log(categoryItems);

//   if (!categoryItems || categoryItems.data.length === 0) return null;

//   return categoryItems.data;
// }

async function getCategoryData(slug: string) {

  const query = qs.stringify(
    {
      populate: {
        image: true,               // imagem da própria categoria
        products: {
          populate: ["images"],    // imagens dos produtos da categoria pai
        },
        categories: {              // subcategorias
          populate: {
            image: true,           // imagem da subcategoria
            products: {
              populate: ["images"] // imagens dos produtos da subcategoria
            },
          },
        },
      },
      filters: {
        slug: { $eq: slug },     // opcional: filtra pelo slug
      },
    },
    { encodeValuesOnly: true }
  );

  const url =
    "https://luma-catalogo-strapi-production.up.railway.app/api/categories?" +
    query;

  const res = await fetch(url);

  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.[0] || null;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = await getCategoryData(params.category);
  if (!categoryData) {
    notFound();
  }

  const category: ICategoryPageData = {
    id: categoryData.id,
    name: categoryData.name,
    slug: categoryData.slug,
    description: categoryData.description,
    image: categoryData.image,
    categories: categoryData.categories || [], // se não houver categorias, renderiza os produtos
    products: categoryData.products || [],
  };

  const hasSubcategories = category.categories.length > 0;
  const hasProducts = category.products.length > 0;

  console.log(category);

  return (
    <div className="flex flex-col mb-8">
      <header className="flex flex-col pt-8 items-center justify-center mb-8">
        <h1 className="text-3xl 2xl:text-5xl font-bold">{category.name}</h1>
        <p className="text-xl 2xl:text-2xl">Clique e escolha o tamanho desejado</p>
      </header>

      {/* caso haja subcategorias, as renderizaremos */}
      {hasSubcategories && (
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-8 justify-center place-items-center">
          {category.categories.map((subcategory) => (
            <Link href={`/${subcategory.slug}`} key={subcategory.slug}>
              <Card className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md border-none transform hover:scale-101 hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-85 2xl:h-138 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl 2xl:text-2xl font-bold">
                    {subcategory.name}
                  </CardTitle>
                  {/* <CardDescription className="text-xl text-gray-900 2xl:text-lg font-semibold">
                    {subcategory.description || ''}
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Image
                    src={`https://lumafestas.s3.sa-east-1.amazonaws.com/uploads/${subcategory.slug}.png`}
                    alt={`Subcategoria ${subcategory.name}`}
                    width={400}
                    height={400}
                    className="flex rounded-2xl object-cover object-center w-full h-50 2xl:h-100 mb-4"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* caso não haja subcategorias, renderizaremos os produtos */}
      {!hasSubcategories && hasProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 px-8 justify-center items-center 2xl:text-2xl ">
          {category.products.map((productItem) => (
            <div key={productItem.id} className="flex w-full justify-center items-center">
              <ProductCard
                product={{
                  id: productItem.id,
                  name: productItem.name,
                  description: productItem.description,
                  SKU: productItem.SKU,
                  inStock: productItem.inStock,
                  slug: productItem.slug,
                  images: productItem.images,
                  priceAtacarejo: productItem.priceAtacarejo,
                  priceAtacado: productItem.priceAtacado,
                  minAtacarejoQty: productItem.minAtacarejoQty,
                  minAtacadoQty: productItem.minAtacadoQty,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
