import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
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
  image: { url: string },
};

async function getCategoryItems(category: string) {
  const data = await fetch(`http://localhost:1337/api/products?filters[category][slug][$eq]=${category}&populate=*&pagination[pageSize]=50`);
  const categoryItems = await data.json();

  console.log(categoryItems);

  if (!categoryItems || categoryItems.data.length === 0) return null;

  return categoryItems.data;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryItemsFromAPI = await getCategoryItems(params.category);
  if (!categoryItemsFromAPI) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        Página de produtos da categoria {params.category}
      </div>

      {/* product cards */}
      <div className="grid grid-cols-5 gap-4 p-16 overflow-hidden">
        {categoryItemsFromAPI.map((productItem: IProductItem) => (
          <Card key={productItem.slug} className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-sm border-none transform hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-140 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">
                {productItem.name}
              </CardTitle>
              <CardDescription className="text-xm text-shadow-sm text-gray-500 mb-2">
                <p>{productItem.description}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={
                  productItem.image?.url ?
                    `http://localhost:1337${productItem.image?.url}` :
                    `https://picsum.photos/901`
                }
                alt={`Categoria ${productItem.name}`}
                width={400}
                height={400}
                className="flex rounded-2xl object-cover object-center w-full h-85 mb-2"
              />
            </CardContent>
            <CardFooter className="flex justify-center items-center rounded-3xl ">
              <Button>Comprar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div >
  );
}
