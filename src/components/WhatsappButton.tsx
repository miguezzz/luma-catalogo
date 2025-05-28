// src/components/WhatsAppButton.tsx
import Image from 'next/image';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511974880794?text=Ol%C3%A1!%20Vim%20do%20cat%C3%A1logo%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!" // troque para o número da sua empresa
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 md:top-6 right-16 md:right-24 z-50 bg-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg hover:bg-gray-100 focus:bg-gray-100 transition"
      aria-label="WhatsApp"
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp"
        width={32}
        height={32}
        style={{ objectFit: 'contain' }}
        className='w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10 text-green-500' // ajuste o tamanho conforme necessário
      />
    </a>
  );
}
