'use client';

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-white text-amber-700 hover:bg-amber-700 hover:text-white border-none font-bold py-2 px-8 rounded-3xl transform hover:shadow-[0_0_30px_#9b5300] transition-all ease-in-out duration-300">
      {children}
    </button>
  );
}