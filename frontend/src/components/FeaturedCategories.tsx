import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Living Room', description: 'Sofas, tables & accent pieces', image: '/assets/generated/category-living-room.dim_400x300.png', key: 'Living Room' },
  { name: 'Bedroom', description: 'Beds, lamps & cozy essentials', image: '/assets/generated/category-bedroom.dim_400x300.png', key: 'Bedroom' },
  { name: 'Kitchen', description: 'Decor & countertop accessories', image: '/assets/generated/category-kitchen.dim_400x300.png', key: 'Kitchen' },
  { name: 'Outdoor', description: 'Garden furniture & planters', image: '/assets/generated/category-outdoor.dim_400x300.png', key: 'Outdoor' },
  { name: 'Office', description: 'Desks, chairs & workspace decor', image: '/assets/generated/category-furniture.dim_600x600.png', key: 'Office' },
  { name: 'Dining Room', description: 'Tables, chairs & tableware', image: '/assets/generated/category-accessories.dim_600x600.png', key: 'Dining Room' },
  { name: 'Garden', description: 'Planters, lights & garden art', image: '/assets/generated/category-art.dim_600x600.png', key: 'Garden' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Curated Collections</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <div className="gold-divider" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4">
            Find the perfect pieces for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              search={{ category: cat.key }}
              className="group luxury-card overflow-hidden"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden bg-secondary">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-semibold text-sm text-background">{cat.name}</h3>
                  <p className="text-background/70 text-xs mt-0.5 hidden sm:block">{cat.description}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Browse →</span>
                <ArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
