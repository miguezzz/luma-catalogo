import { Metadata } from "next";
import Link from "next/link";

// adicionar titulo correto
const metadata: Metadata = {
  title: `${2} - Catálogo Luma Festas`,
}

export default function CategoryLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex flex-col justify-start">
          <Link href={"/"}>
            <h1 className="flex text-xl font-bold pt-4 pl-4">Voltar para Página Inicial</h1>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}