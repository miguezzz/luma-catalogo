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

  console.log(categories.data);
  return categories.data;
}

export default async function Home() {
  const categoriesList = await getCategories();

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
        {categoriesList.map((category: { slug: string; name: string; image: { url: string } }) => (
          <Card key={category.slug}>
            <CardHeader>
              <CardTitle>
                {category.name}
              </CardTitle>
              <CardDescription>
                <p>Descrição da categoria</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={
                  category.image?.url ?
                    `http://localhost:1337${category.image?.url}` :
                    `https://picsum.photos/200`
                }
                alt={`Categoria ${category.name}`}
                width={400}
                height={400}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
