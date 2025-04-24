import Link from "next/link"
import BalloonAnimation from "@/components/BaloonAnimation"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-400 via-orange-500 to-pink-500">
      {/* Balões animados */}
      <BalloonAnimation />

      {/* Conteúdo principal */}
      <div className="z-10 text-center p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md">
        <h1 className="text-5xl font-bold text-white mb-4">Erro 404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">Página não Encontrada</h2>
        <p className="text-white mb-8">
          Oops! A Página que você está procurando parece ter flutuado como um balão e não foi encontrada.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg "
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  )
}
