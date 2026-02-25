import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, ShoppingCart, Heart, LayoutDashboard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { label: 'Home', to: '/' as const },
  { label: 'Shop', to: '/shop' as const },
  { label: 'About', to: '/about' as const },
  { label: 'Blog', to: '/blog' as const },
  { label: 'Contact', to: '/contact' as const },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-luxury">
      {/* Top announcement bar */}
      <div className="bg-foreground text-background text-center py-2 text-xs tracking-widest uppercase">
        Free Shipping on Orders Over $200 · Use Code <span className="text-gold font-semibold">SAVE20</span> for 20% Off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/generated/signature-home-decor-logo.dim_320x120.png"
              alt="Signature Home Decor LLP Logo"
              className="h-12 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg leading-tight text-foreground tracking-wide">
                Signature Home Decor
              </span>
              <p className="text-xs text-gold font-medium tracking-[0.2em] uppercase">LLP · Est. 2020</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-gold transition-colors duration-150 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Utility icons */}
          <div className="flex items-center gap-2">
            <Link
              to="/wishlist"
              className="p-2 hover:bg-secondary transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-foreground" />
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-secondary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} className="text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            <Link
              to="/admin"
              className="hidden md:flex p-2 hover:bg-secondary transition-colors"
              aria-label="Admin"
            >
              <LayoutDashboard size={18} className="text-muted-foreground" />
            </Link>
            <button
              className="md:hidden p-2 hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-luxury-deep animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-gold hover:bg-secondary transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-gold hover:bg-secondary transition-colors tracking-wide"
            >
              Admin Dashboard
            </Link>
            <div className="mt-3 pt-3 border-t border-border flex gap-3">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 text-center luxury-btn-primary text-xs"
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 text-center luxury-btn-outline text-xs"
              >
                Wishlist
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
