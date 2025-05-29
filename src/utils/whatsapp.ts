// src/utils/whatsapp.ts
import { CartItem } from '@/context/cart';

export function buildWhatsAppMessage(
  items: CartItem[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  phoneNumber: string, // no formato “5511999999999” (DDD+cel sem “+”)
): string {
  const header = 'Olá, gostaria de finalizar meu pedido:\n\n';
  const lines = items.map((item, idx) => {
    const unitPrice = item.price; // se você guardou total no price
    const itemPrice = (item.qty * unitPrice);
    return `${idx + 1}. SKU: ${item.SKU} — ${item.name}\n` +
           `   Qtd: ${item.qty} × R$ ${unitPrice} = R$ ${itemPrice}\n`;
  });
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const footer = `\nTotal do pedido: R$ ${total.toFixed(2)}\n\nObrigado!`;

  const full = header + lines.join('\n') + footer;
  // WhatsApp espera tudo URI-encoded
  return encodeURIComponent(full);
}
