import { AuroraText } from "@/components/magicui/aurora-text";

import Card from "@/components/Card";

const getCategories = async () => {
  const data = await fetch('http://localhost:1337/api/categories');

  const categories = await data.json();

  return categories.data;
}

export default async function Home() {
  const categoriesList = await getCategories();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-10">
        <h1><AuroraText>Categorias</AuroraText></h1>
      </div>
      {/* grid com categorias */}
      <div className="flex items-center justify-center px-8 py-10">
        <div className="grid grid-cols-4 gap-10 ">
          {categoriesList.map((category: { slug: string; name: string; }) => (
            <Card slug={category.slug} name={category.name} />
          ))}
        </div>
      </div>
    </>
  );
}
