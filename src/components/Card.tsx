'use client';

export default function Card({ slug, name }: { slug: string; name: string; }) {

  return (
    <div key={slug} className="flex justify-center align-center w-76 h-76 bg-white text-black shadow-md rounded-lg">
      <ul>
        <li>
          <p>{name}</p>
        </li>
      </ul>
    </div>
  );
}