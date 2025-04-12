import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";


const getCategories = async () => {
  const data = await fetch('http://localhost:1337/api/categories?populate=*');

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
        <header className="p-4">
          <h1 className="flex justify-center text-6xl">Catálogo</h1>
          <p className="text-sm pt-3">Clique na categoria desejada para acessar a página de produtos.</p>
        </header>
      </div>

      {/* category cards */}
      <div className="grid grid-cols-4 gap-4 p-24">
        {categoriesList.map((categoryItem: { slug: string; name: string; image: { url: string }; category: {} }) => (
          <Card key={categoryItem.slug}>
            <CardHeader>
              <CardTitle>
                {categoryItem.name}
              </CardTitle>
              <CardDescription>
                <p>Descrição da categoria</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={
                  categoryItem.image?.url ?
                    `http://localhost:1337${categoryItem.image?.url}` :
                    `https://picsum.photos/200`
                }
                alt={`Categoria ${categoryItem.name}`}
                width={400}
                height={400}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div >
  );
}
