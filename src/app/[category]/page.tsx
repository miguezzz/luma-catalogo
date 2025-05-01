import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';

import qs from "qs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IProductItem {
  id: number,
  name: string,
  slug: string,
  description: string,
  images: any[],
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
    <div className="flex flex-col">
      <header className="flex flex-col pt-8 items-center justify-center">
        <h1 className="text-3xl font-bold my-6">{category.name}</h1>
      </header>

      {/* caso haja subcategorias, as renderizaremos */}
      {hasSubcategories && (
        <div className="grid grid-cols-4 gap-4 p-16 overflow-hidden">
          {category.categories.map((subcategory) => (
            <Link href={`/${subcategory.slug}`} key={subcategory.slug}>
              <Card className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md border-none transform hover:scale-101 hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-135 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">{subcategory.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {subcategory.description || ''}
                  </CardDescription>
                </CardHeader>
                {subcategory.image && (
                  <CardContent>
                    <Image
                      src={`https://luma-catalogo-strapi-production.up.railway.app${subcategory.image.url}`}
                      alt={`Subcategoria ${subcategory.name}`}
                      width={300}
                      height={300}
                      className="flex rounded-2xl object-cover object-center w-full h-100 mb-4"
                    />
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* caso não haja subcategorias, renderizaremos os produtos */}
      {!hasSubcategories && hasProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-8">
          {category.products.map((productItem) => (
            <Card key={productItem.slug} className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-sm border-none transform hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-140 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">{productItem.name}</CardTitle>
                <CardDescription className="text-xm text-shadow-sm text-gray-500 mb-2">
                  {productItem.description || ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={
                    productItem.images?.[0]?.url
                      ? `https://luma-catalogo-strapi-production.up.railway.app${productItem.images[0].url}`
                      : `https://picsum.photos/400`
                  }
                  alt={`Produto ${productItem.name}`}
                  width={400}
                  height={400}
                  className="flex rounded-2xl object-cover object-center w-full h-85 mb-2"
                />
              </CardContent>
              <CardFooter className="flex justify-center items-center rounded-3xl">
                <Button>Comprar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
