import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';

const currentYear = new Date().getFullYear();
const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'signature-home-decor');

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/signature-home-decor-logo.dim_320x120.png"
              alt="Signature Home Decor LLP"
              className="h-12 w-auto object-contain brightness-0 invert mb-5"
            />
            <h2 className="font-display text-xl font-bold mb-3 text-background">
              Signature Home Decor <span className="text-gold">LLP</span>
            </h2>
            <p className="text-background/65 text-sm leading-relaxed mb-6 max-w-xs">
              Bringing elegance to every room. We curate the finest home decor pieces to transform your living spaces into beautiful sanctuaries.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SiInstagram, label: 'Instagram' },
                { Icon: SiFacebook, label: 'Facebook' },
                { Icon: SiPinterest, label: 'Pinterest' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-background/20 flex items-center justify-center text-background/60 hover:text-gold hover:border-gold transition-colors duration-150"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' as const },
                { label: 'Shop', to: '/shop' as const },
                { label: 'About Us', to: '/about' as const },
                { label: 'Blog', to: '/blog' as const },
                { label: 'Contact', to: '/contact' as const },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-background/65 hover:text-background transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-background/65">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>123 Decor Avenue, Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/65">
                <Phone size={14} className="text-gold shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/65">
                <Mail size={14} className="text-gold shrink-0" />
                <span>hello@signaturehomedecor.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/45">
          <p>© {currentYear} Signature Home Decor LLP. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart size={11} className="text-gold fill-gold" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-background transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
