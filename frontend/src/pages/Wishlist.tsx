import React from 'react';
import { Link } from '@tanstack/react-router';
import { useWishlist } from '../contexts/WishlistContext';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';

const categoryImages: Record<string, string> = {
  'Living Room': '/assets/generated/category-living-room.dim_400x300.png',
  'Bedroom': '/assets/generated/category-bedroom.dim_400x300.png',
  'Kitchen': '/assets/generated/category-kitchen.dim_400x300.png',
  'Outdoor': '/assets/generated/category-outdoor.dim_400x300.png',
  'Office': '/assets/generated/category-furniture.dim_600x600.png',
  'Dining Room': '/assets/generated/category-accessories.dim_600x600.png',
  'Garden': '/assets/generated/category-art.dim_600x600.png',
};

export default function Wishlist() {
  const { items, removeFromWishlist, moveToCart } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Heart size={48} className="text-muted-foreground mb-6" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">Save your favorite pieces to your wishlist and come back to them anytime.</p>
        <Link to="/shop" className="luxury-btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Saved Items</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">My Wishlist</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => {
            const imgSrc = product.imageUrl || categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png';
            return (
              <div key={Number(product.id)} className="luxury-card overflow-hidden flex flex-col group">
                <div className="relative h-56 overflow-hidden bg-secondary">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png'; }}
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-card flex items-center justify-center text-foreground hover:text-destructive transition-colors shadow-luxury"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{product.category}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-display font-bold text-sm">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => moveToCart(product)}
                      className="flex items-center gap-1.5 text-xs text-gold hover:text-foreground transition-colors font-medium"
                    >
                      <ShoppingCart size={12} />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
