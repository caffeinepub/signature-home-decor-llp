import React from 'react';
import { Link } from '@tanstack/react-router';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const categoryImages: Record<string, string> = {
  'Living Room': '/assets/generated/category-living-room.dim_400x300.png',
  'Bedroom': '/assets/generated/category-bedroom.dim_400x300.png',
  'Kitchen': '/assets/generated/category-kitchen.dim_400x300.png',
  'Outdoor': '/assets/generated/category-outdoor.dim_400x300.png',
  'Office': '/assets/generated/category-furniture.dim_600x600.png',
  'Dining Room': '/assets/generated/category-accessories.dim_600x600.png',
  'Garden': '/assets/generated/category-art.dim_600x600.png',
};

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <ShoppingBag size={48} className="text-muted-foreground mb-6" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">Discover our curated luxury home decor collections and find the perfect pieces for your home.</p>
        <Link to="/shop" className="luxury-btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Your Selection</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Shopping Cart</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => {
              const imgSrc = product.imageUrl || categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png';
              return (
                <div key={Number(product.id)} className="flex gap-5 p-5 luxury-card">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-24 h-24 object-cover shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = categoryImages[product.category] || '/assets/generated/category-living-room.dim_400x300.png'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-semibold text-sm text-foreground">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center text-sm">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-display font-bold text-sm text-foreground">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="luxury-card p-6 sticky top-28">
              <h2 className="font-display text-lg font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={Number(product.id)} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{product.name} × {quantity}</span>
                    <span className="text-foreground font-medium shrink-0">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-display font-bold text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Shipping calculated at checkout</p>
              </div>
              <Link to="/checkout" className="luxury-btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="luxury-btn-outline w-full text-center block mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
