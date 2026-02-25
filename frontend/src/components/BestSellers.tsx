import React from 'react';
import { Link } from '@tanstack/react-router';
import { useProducts } from '../hooks/useQueries';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function BestSellers() {
  const { data: products, isLoading } = useProducts();
  const bestSellers = products?.slice(0, 4) ?? [];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Most Loved</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Best Sellers
          </h2>
          <div className="gold-divider" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="luxury-card overflow-hidden">
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={Number(product.id)} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/shop" className="luxury-btn-outline inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
