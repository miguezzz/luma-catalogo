const getCategories = async () => {
  const data = await fetch('http://localhost:1337/api/products');

  const categories = await data.json();

  return categories.data;
}

export default async function Home() {
  const categoriesList = await getCategories();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1>Categorias</h1>
      <ul>
        {categoriesList.map((category: { slug: string; name: string }) => (
          <li key={category.slug}>
            {category.name}
          </li>
        ))}
        <li>Teste</li>
      </ul>
    </div>
  );
}
