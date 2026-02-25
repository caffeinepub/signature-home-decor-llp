import React from 'react';
import { SiInstagram } from 'react-icons/si';

const tiles = [
  '/assets/generated/instagram-tile-1.dim_600x600.png',
  '/assets/generated/instagram-tile-2.dim_600x600.png',
  '/assets/generated/instagram-tile-3.dim_600x600.png',
  '/assets/generated/instagram-tile-4.dim_600x600.png',
  '/assets/generated/instagram-tile-5.dim_600x600.png',
  '/assets/generated/instagram-tile-6.dim_600x600.png',
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Follow Our Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            @SignatureHomeDecor
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {tiles.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block"
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <SiInstagram size={24} className="text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
