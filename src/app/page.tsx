import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import Image from "next/image";

interface ICategoryItem {
  slug: string,
  name: string,
  image: { url: string },
  category: {},
  description: string,
}

const getCategories = async () => {
  const data = await fetch('https://luma-catalogo-strapi-production.up.railway.app/api/categories?populate=*&pagination[pageSize]=50');

  const categories = await data.json();

  return categories.data;
}

export default async function Home() {
  const fullCategoriesList = await getCategories();

  const categoriesList = fullCategoriesList.filter((categoryItem: { category: {} }) => {
    return categoryItem.category === null;
  });

  return (
    <div className="flex flex-col">
      {/* header */}
      <header className="flex flex-col pt-16 items-center justify-center">
        <h1 className="flex justify-center text-6xl font-bold">Catálogo</h1>
        <p className="text-sm pt-3 font-semibold">Clique na categoria desejada para acessar a página de produtos.</p>
      </header>

      {/* category cards */}
      <div className="grid grid-cols-4 gap-4 p-16 overflow-hidden">
        {categoriesList.map((categoryItem: ICategoryItem) => (
          <Link href={`/${categoryItem.slug}`} key={categoryItem.slug}>
            <Card className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md border-none transform hover:scale-101 hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-135 overflow-hidden" key={categoryItem.slug}>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {categoryItem.name}
                </CardTitle>
                <CardDescription className="text-xm text-shadow-sm text-gray-500 mb-2">
                  <p>{categoryItem.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={`https://lumafestas.s3.sa-east-1.amazonaws.com/uploads/${categoryItem.slug}.png`}
                  alt={`Categoria ${categoryItem.name}`}
                  width={400}
                  height={400}
                  className="flex rounded-2xl object-cover object-center w-full h-100 mb-4"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div >
  );
}
