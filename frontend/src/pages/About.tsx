import React from 'react';
import { Link } from '@tanstack/react-router';

export default function About() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <img
          src="/assets/generated/about-hero.dim_1440x800.png"
          alt="Signature Home Decor story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium mb-4">Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-background mb-4">
              About Us
            </h1>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Who We Are</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Brand Story
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Founded in 2020, Signature Home Decor LLP was born from a simple belief: that every home deserves to be beautiful. Our founders, passionate about interior design and craftsmanship, set out to create a curated destination for luxury home decor that speaks to the American aesthetic — timeless, refined, and deeply personal.
            </p>
            <p>
              We source our pieces from artisans and designers across the globe, selecting only those that meet our exacting standards for quality, beauty, and longevity. From hand-crafted furniture to one-of-a-kind art pieces, every item in our collection tells a story.
            </p>
            <p>
              Today, Signature Home Decor serves thousands of customers across the United States and internationally, helping them transform their living spaces into sanctuaries of style and comfort. We believe that the spaces we inhabit shape how we feel, think, and live — and we take that responsibility seriously.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium mb-3">What Drives Us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-background mb-4">
              Vision & Mission
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-background/15 p-10">
              <h3 className="font-display text-xl font-bold text-gold mb-4">Our Vision</h3>
              <p className="text-background/70 leading-relaxed">
                To be the most trusted luxury home decor destination in America — a place where discerning homeowners discover pieces that elevate their everyday living and reflect their unique sense of style.
              </p>
            </div>
            <div className="border border-background/15 p-10">
              <h3 className="font-display text-xl font-bold text-gold mb-4">Our Mission</h3>
              <p className="text-background/70 leading-relaxed">
                To curate and deliver exceptional home decor products with uncompromising quality, outstanding customer service, and a commitment to sustainable and ethical sourcing — making luxury accessible without sacrificing integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'Every piece is carefully selected and inspected to ensure it meets our premium standards.' },
              { title: 'Customer Obsessed', desc: 'Your satisfaction is our priority. We go above and beyond to ensure a seamless experience.' },
              { title: 'Timeless Design', desc: 'We curate pieces that transcend trends — beautiful today, cherished for generations.' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-8 luxury-card">
                <div className="w-10 h-0.5 bg-gold mx-auto mb-5" />
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Transform Your Home?</h2>
          <p className="text-muted-foreground mb-8">Explore our curated collections and find the perfect pieces for your space.</p>
          <Link to="/shop" className="luxury-btn-gold inline-block">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}
