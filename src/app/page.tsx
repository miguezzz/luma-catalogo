import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import Image from "next/image";

interface ICategoryItem {
  slug: string,
  name: string,
  image: { url: string },
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  category: {},
  description: string,
}

const getCategories = async () => {
  const data = await fetch('https://luma-catalogo-strapi-production.up.railway.app/api/categories?populate=*&pagination[pageSize]=150');

  const categories = await data.json();

  return categories.data;
}

export default async function Home() {
  const fullCategoriesList = await getCategories();

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const categoriesList = fullCategoriesList.filter((categoryItem: { category: {} }) => {
    return categoryItem.category === null;
  });

  return (
    <div className="flex flex-col">
      {/* header */}
      <header className="flex flex-col pt-16 items-center justify-center">
        <h1 className="flex justify-center text-6xl font-bold">Catálogo</h1>
        <p className="flex text-sm justify-center pl-6 xl:pl-0 2xl:pl-0 md:pl-0 md:mb-2 pt-3 font-semibold md:text-2xl 2xl:text-2xl">Clique na categoria desejada para acessar a página de produtos.</p>
      </header>

      {/* category cards */}
      <div className="grid grid-cols-2 p-4 gap-4 md:gap-7 2xl:p-16 md:grid-cols-3 2xl:grid-cols-4">
        {categoriesList.map((categoryItem: ICategoryItem) => (
          <Link href={`/${categoryItem.slug}`} key={categoryItem.slug}>
            <Card className="flex bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md border-none transform hover:scale-101 hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all ease-in-out duration-300 h-75 md:h-115 2xl:h-138 overflow-hidden" key={categoryItem.slug}>
              <CardHeader>
                <CardTitle className="flex text-md md:text-3xl 2xl:text-3xl font-bold">
                  {categoryItem.name}
                </CardTitle>
                {/* <CardDescription className="text-xm text-gray-900 2xl:mb-2 2xl:text-lg font-semibold">
                  <p>{categoryItem.description}</p>
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <Image
                  src={`https://lumafestas.s3.sa-east-1.amazonaws.com/uploads/${categoryItem.slug}.png`}
                  alt={`Categoria ${categoryItem.name}`}
                  width={400}
                  height={400}
                  className="flex rounded-2xl object-cover object-center w-full h-50 md:h-88 2xl:h-100 mb-4"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div >
  );
}
