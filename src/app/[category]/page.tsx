async function getCategoryItems(category: string) {
  const data = await fetch(`http://localhost:1337/api/products?filters[categories][slug][$eq]=${category}&populate=*&pagination[pageSize]=50`);

  const categories = await data.json();

  return categories.data;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryItems = await getCategoryItems(params.category);
  console.log(categoryItems);

  return (
    <div>
      Página de produtos da categoria {params.category}
    </div>
  )
}