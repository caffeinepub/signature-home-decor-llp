import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '../backend';
import { useCart } from './CartContext';

interface WishlistContextValue {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: bigint) => void;
  moveToCart: (product: Product) => void;
  isInWishlist: (productId: bigint) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function serializeWishlist(items: Product[]): string {
  return JSON.stringify(items.map(p => ({ ...p, id: p.id.toString() })));
}

function deserializeWishlist(raw: string): Product[] {
  try {
    const parsed = JSON.parse(raw);
    return parsed.map((p: Record<string, unknown>) => ({ ...p, id: BigInt(p.id as string) } as Product));
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? deserializeWishlist(stored) : [];
  });
  const { addToCart } = useCart();

  useEffect(() => {
    localStorage.setItem('wishlist', serializeWishlist(items));
  }, [items]);

  const addToWishlist = useCallback((product: Product) => {
    setItems(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product]);
  }, []);

  const removeFromWishlist = useCallback((productId: bigint) => {
    setItems(prev => prev.filter(p => p.id !== productId));
  }, []);

  const moveToCart = useCallback((product: Product) => {
    addToCart(product, 1);
    setItems(prev => prev.filter(p => p.id !== product.id));
  }, [addToCart]);

  const isInWishlist = useCallback((productId: bigint) => items.some(p => p.id === productId), [items]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, moveToCart, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
