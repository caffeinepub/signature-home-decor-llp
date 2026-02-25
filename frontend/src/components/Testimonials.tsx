import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'New York, NY',
    quote: 'Signature Home Decor transformed my living room completely. The quality is exceptional and the pieces are exactly as described. I\'ve received so many compliments!',
    rating: 5,
    initials: 'SM',
  },
  {
    name: 'James Thornton',
    location: 'Los Angeles, CA',
    quote: 'I was looking for something truly unique for my home office and found exactly that here. The craftsmanship is outstanding and delivery was prompt.',
    rating: 5,
    initials: 'JT',
  },
  {
    name: 'Emily Chen',
    location: 'Chicago, IL',
    quote: 'The bedroom set I purchased exceeded all my expectations. The attention to detail is remarkable. This is luxury home decor done right.',
    rating: 5,
    initials: 'EC',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium mb-3">What Our Clients Say</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-background mb-4">
            Customer Stories
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-background/15 p-8 flex flex-col">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-background/75 text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-background/10">
                <div className="w-10 h-10 bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <span className="font-display text-xs font-bold text-gold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-background">{t.name}</p>
                  <p className="text-xs text-background/50">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
