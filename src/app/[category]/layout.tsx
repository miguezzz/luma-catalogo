import { Metadata } from "next";
import Link from "next/link";

// adicionar titulo correto
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: `${2} - Catálogo Luma Festas`,
}

export default function CategoryLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex justify-start">
          <h1 className="inline-block text-xl md:text-3xl 2xl:text-3xl font-bold pt-4 pl-4">
            <Link href="/">Voltar para Página Inicial</Link>
          </h1>
        </div>
      </header>
      {children}
    </div>
  );
}