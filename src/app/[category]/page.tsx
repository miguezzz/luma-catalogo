import { notFound } from 'next/navigation';

interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
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
    <>
      <div>
        Página de produtos da categoria {params.category}
      </div>

    </>
  );
}
