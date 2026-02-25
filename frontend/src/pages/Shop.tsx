import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ProductSkeleton() {
  return (
    <div className="luxury-card overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export default function Shop() {
  const search = useSearch({ from: '/shop' }) as { category?: string };
  const initialCategory = search?.category || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (search?.category) setSelectedCategory(search.category);
  }, [search?.category]);

  const { data: products, isLoading, isError } = useProducts(selectedCategory);

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) result = result.filter(p => p.price >= min);
    if (!isNaN(max)) result = result.filter(p => p.price <= max);

    switch (sortOrder) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [products, searchQuery, minPrice, maxPrice, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Our Collection</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">Shop</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-48 border-border rounded-none">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm text-foreground hover:border-gold hover:text-gold transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Price filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-secondary/30 border border-border animate-fade-in">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Min $</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 px-3 py-1.5 border border-border bg-card text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Max $</label>
              <input
                type="number"
                placeholder="600"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 px-3 py-1.5 border border-border bg-card text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <button
              onClick={() => { setMinPrice(''); setMaxPrice(''); }}
              className="text-xs text-muted-foreground hover:text-gold transition-colors underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Category filter */}
        <div className="mb-8">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {isLoading ? 'Loading products…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-destructive text-sm">Failed to load products. Please try again.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch size={40} className="text-muted-foreground mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
              className="luxury-btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filtered.map((product) => (
              <ProductCard key={Number(product.id)} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
