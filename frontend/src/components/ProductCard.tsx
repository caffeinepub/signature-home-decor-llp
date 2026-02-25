import React from 'react';
import { Link } from '@tanstack/react-router';
import type { Product } from '../backend';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const categoryImages: Record<string, string> = {
  'Living Room': '/assets/generated/category-living-room.dim_400x300.png',
  'Bedroom': '/assets/generated/category-bedroom.dim_400x300.png',
  'Kitchen': '/assets/generated/category-kitchen.dim_400x300.png',
  'Outdoor': '/assets/generated/category-outdoor.dim_400x300.png',
  'Office': '/assets/generated/category-furniture.dim_600x600.png',
  'Dining Room': '/assets/generated/category-accessories.dim_600x600.png',
  'Garden': '/assets/generated/category-art.dim_600x600.png',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const imgSrc = product.imageUrl || categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png';
  const inWishlist = isInWishlist(product.id);

  return (
    <article className="luxury-card overflow-hidden flex flex-col group">
      <div className="relative h-56 overflow-hidden bg-secondary">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png';
          }}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
            className={`w-8 h-8 flex items-center justify-center bg-card shadow-luxury ${inWishlist ? 'text-gold' : 'text-foreground hover:text-gold'} transition-colors`}
            aria-label="Add to wishlist"
          >
            <Heart size={14} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="w-8 h-8 flex items-center justify-center bg-card shadow-luxury text-foreground hover:text-gold transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-widest uppercase bg-foreground text-background px-2 py-1 font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-sm text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="font-display text-base font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Link
            to="/product/$id"
            params={{ id: product.id.toString() }}
            className="text-xs tracking-widest uppercase text-gold hover:text-foreground transition-colors font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
