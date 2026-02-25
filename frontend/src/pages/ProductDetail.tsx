import React, { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useProducts } from '../hooks/useQueries';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ShippingReturnAccordion from '../components/ShippingReturnAccordion';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Heart, Check } from 'lucide-react';

const categoryImages: Record<string, string> = {
  'Living Room': '/assets/generated/category-living-room.dim_400x300.png',
  'Bedroom': '/assets/generated/category-bedroom.dim_400x300.png',
  'Kitchen': '/assets/generated/category-kitchen.dim_400x300.png',
  'Outdoor': '/assets/generated/category-outdoor.dim_400x300.png',
  'Office': '/assets/generated/category-furniture.dim_600x600.png',
  'Dining Room': '/assets/generated/category-accessories.dim_600x600.png',
  'Garden': '/assets/generated/category-art.dim_600x600.png',
};

export default function ProductDetail() {
  const { id } = useParams({ from: '/product/$id' });
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products?.find(p => p.id.toString() === id);
  const related = products?.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4) ?? [];
  const inWishlist = product ? isInWishlist(product.id) : false;
  const imgSrc = product ? (product.imageUrl || categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png') : '';

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Skeleton className="h-[500px] w-full rounded-none" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="luxury-btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-10">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image */}
          <div className="relative">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-[500px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] tracking-widest uppercase bg-foreground text-background px-3 py-1.5 font-medium">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">USD</span>
            </div>
            <div className="w-10 h-0.5 bg-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Quantity</span>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                  addedToCart
                    ? 'bg-green-700 text-white'
                    : 'bg-foreground text-background hover:bg-foreground/85'
                }`}
              >
                {addedToCart ? <><Check size={14} /> Added to Cart</> : <><ShoppingCart size={14} /> Add to Cart</>}
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className={`w-14 flex items-center justify-center border transition-colors duration-200 ${
                  inWishlist ? 'border-gold text-gold bg-gold/5' : 'border-border text-foreground hover:border-gold hover:text-gold'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Shipping & Returns */}
            <ShippingReturnAccordion />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <p className="section-label mb-3">You May Also Like</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Related Products</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={Number(p.id)} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
