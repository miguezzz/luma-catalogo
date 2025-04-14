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

const getCategories = async () => {
  const data = await fetch('http://localhost:1337/api/categories?populate=*&pagination[pageSize]=50');

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
      <div className="flex flex-col items-center justify-center">
        <header className="pt-16">
          <h1 className="flex justify-center text-6xl">Catálogo</h1>
          <p className="text-sm pt-3">Clique na categoria desejada para acessar a página de produtos.</p>
        </header>
      </div>

      {/* category cards */}
      <div className="grid grid-cols-4 gap-4 p-16 ">
        {categoriesList.map((categoryItem: { slug: string; name: string; image: { url: string }; category: {} }) => (
          <Card className="bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md border-none" key={categoryItem.slug}>
            <CardHeader>
              <CardTitle className="text-2xl">
                {categoryItem.name}
              </CardTitle>
              <CardDescription>
                <p>Descrição da categoria</p>
              </CardDescription>
            </CardHeader>
            <CardContent >
              <Image
                src={
                  categoryItem.image?.url ?
                    `http://localhost:1337${categoryItem.image?.url}` :
                    `https://picsum.photos/200`
                }
                alt={`Categoria ${categoryItem.name}`}
                width={400}
                height={400}
                className="rounded-2xl"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div >
  );
}
