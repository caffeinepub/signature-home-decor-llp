import React from 'react';
import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hello! I am interested in your home decor products. Could you please help me?');
  const whatsappUrl = `https://wa.me/18005550199?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center shadow-luxury-deep hover:scale-110 transition-transform duration-200"
      style={{ borderRadius: '50%' }}
    >
      <SiWhatsapp size={26} />
    </a>
  );
}
