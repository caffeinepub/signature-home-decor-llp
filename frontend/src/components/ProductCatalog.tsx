import React from 'react';
import { useProducts } from '../hooks/useQueries';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, PackageSearch } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function ProductSkeleton() {
  return (
    <div className="luxury-card overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog({ selectedCategory, onCategoryChange }: ProductCatalogProps) {
  const { data: products, isLoading, isError } = useProducts(selectedCategory);

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <p className="section-label mb-2">Our Products</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Collections
              </h2>
              <div className="w-10 h-0.5 bg-gold mt-3" />
            </div>
            <p className="text-muted-foreground text-sm">
              {isLoading ? 'Loading…' : `${products?.length ?? 0} items`}
            </p>
          </div>
          <CategoryFilter selected={selectedCategory} onChange={onCategoryChange} />
        </div>

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={40} className="text-destructive mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Unable to load products</h3>
            <p className="text-muted-foreground text-sm">Please check your connection and try again.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && !isError && products?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch size={40} className="text-muted-foreground mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm mb-6">No items match the selected category.</p>
            <button onClick={() => onCategoryChange('All')} className="luxury-btn-primary">
              View All Products
            </button>
          </div>
        )}

        {!isLoading && !isError && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {products.map((product) => (
              <ProductCard key={Number(product.id)} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
