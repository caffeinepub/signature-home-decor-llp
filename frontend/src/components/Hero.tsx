import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Star, Truck, Shield } from 'lucide-react';

const highlights = [
  { icon: Star, label: 'Premium Quality' },
  { icon: Truck, label: 'Free Delivery Over $200' },
  { icon: Shield, label: 'Trusted Since 2020' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Hero image */}
      <div className="relative h-[500px] sm:h-[580px] lg:h-[680px] w-full">
        <img
          src="/assets/generated/hero-banner.dim_1920x1080.png"
          alt="Beautifully decorated luxury living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/45 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl animate-fade-in">
              <p className="section-label text-gold/90 mb-4">Signature Home Decor LLP</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
                Elevate Your Living{' '}
                <span className="italic text-gold">Spaces</span>
              </h1>
              <p className="text-background/80 text-base sm:text-lg mb-10 leading-relaxed font-light max-w-lg">
                Discover curated luxury home decor collections that bring elegance, warmth, and timeless style to every room.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="luxury-btn-gold inline-flex items-center gap-2">
                  Explore Collections
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-background/50 text-background text-xs font-medium tracking-widest uppercase hover:bg-background/10 transition-colors duration-200"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center sm:justify-around gap-6 py-5">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={18} className="text-gold" />
                <span className="text-xs font-medium text-foreground tracking-wide uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
