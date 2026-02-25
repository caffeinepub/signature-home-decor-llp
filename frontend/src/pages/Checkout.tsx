import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useCart } from '../contexts/CartContext';
import { usePlaceOrder, useApplyCoupon } from '../hooks/useMutations';
import { Check, Tag, Loader2 } from 'lucide-react';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();
  const applyCouponMutation = useApplyCoupon();

  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const [couponError, setCouponError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);

  const finalTotal = discountedTotal ?? subtotal;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.address.trim()) newErrors.address = 'Shipping address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = async () => {
    setCouponError('');
    if (!couponCode.trim()) return;
    try {
      const result = await applyCouponMutation.mutateAsync({ total: subtotal, couponCode: couponCode.trim() });
      if (result < subtotal) {
        setDiscountedTotal(result);
      } else {
        setCouponError('Invalid coupon code. Try DISCOUNT10 or SAVE20.');
      }
    } catch {
      setCouponError('Failed to apply coupon. Please try again.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (items.length === 0) return;

    try {
      const firstItem = items[0];
      const id = await placeOrderMutation.mutateAsync({
        guestName: form.name,
        guestEmail: form.email,
        shippingAddress: form.address,
        productId: firstItem.product.id,
        quantity: BigInt(firstItem.quantity),
        totalPrice: finalTotal,
      });
      setOrderId(id);
      setOrderSuccess(true);
      clearCart();
    } catch {
      // error handled by mutation state
    }
  };

  if (orderSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-gold/10 border border-gold flex items-center justify-center mb-6">
          <Check size={28} className="text-gold" />
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-2">Thank you for your purchase, {form.name}.</p>
        {orderId && <p className="text-xs text-muted-foreground mb-8">Order ID: #{orderId.toString()}</p>}
        <p className="text-sm text-muted-foreground mb-8 max-w-sm">
          A confirmation will be sent to {form.email}. Your order will be processed within 1–2 business days.
        </p>
        <Link to="/shop" className="luxury-btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
        <Link to="/shop" className="luxury-btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Almost There</p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Checkout</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Guest form */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Shipping Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${errors.name ? 'border-destructive' : 'border-border'}`}
                  placeholder="John Smith"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-destructive' : 'border-border'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Shipping Address *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                  rows={4}
                  className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors resize-none ${errors.address ? 'border-destructive' : 'border-border'}`}
                  placeholder="123 Main St, New York, NY 10001"
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-8">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Coupon Code</h3>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); setDiscountedTotal(null); }}
                    className="w-full pl-9 pr-4 py-3 border border-border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter coupon code"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={applyCouponMutation.isPending}
                  className="luxury-btn-outline px-6 py-3 flex items-center gap-2 disabled:opacity-50"
                >
                  {applyCouponMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                </button>
              </div>
              {couponError && <p className="text-xs text-destructive mt-2">{couponError}</p>}
              {discountedTotal !== null && (
                <p className="text-xs text-green-700 mt-2 flex items-center gap-1">
                  <Check size={12} /> Coupon applied! You saved ${(subtotal - discountedTotal).toFixed(2)}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">Try: DISCOUNT10 (10% off) or SAVE20 (20% off)</p>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Order Summary</h2>
            <div className="luxury-card p-6">
              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={Number(product.id)} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{product.name} × {quantity}</span>
                    <span className="text-foreground font-medium shrink-0">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountedTotal !== null && (
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Discount</span>
                    <span>−${(subtotal - discountedTotal).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-700">{subtotal >= 200 ? 'Free' : '$15.00'}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${(finalTotal + (subtotal < 200 ? 15 : 0)).toFixed(2)}</span>
                </div>
              </div>

              {placeOrderMutation.isError && (
                <p className="text-xs text-destructive mt-4">Failed to place order. Please try again.</p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={placeOrderMutation.isPending}
                className="luxury-btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {placeOrderMutation.isPending ? (
                  <><Loader2 size={14} className="animate-spin" /> Processing…</>
                ) : (
                  'Place Order'
                )}
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
