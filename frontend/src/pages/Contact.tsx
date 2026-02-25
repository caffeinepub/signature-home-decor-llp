import React, { useState } from 'react';
import { useSubmitContact } from '../hooks/useMutations';
import { Check, Loader2, MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const submitContact = useSubmitContact();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitContact.mutateAsync(form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      // error handled by mutation state
    }
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-secondary/40 border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Send Us a Message</h2>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-border">
                <div className="w-14 h-14 bg-gold/10 border border-gold flex items-center justify-center mb-5">
                  <Check size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="luxury-btn-outline mt-6"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-destructive' : 'border-border'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Subject *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${errors.subject ? 'border-destructive' : 'border-border'}`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={6}
                    className={`w-full px-4 py-3 border bg-card text-sm text-foreground focus:outline-none focus:border-gold transition-colors resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
                    placeholder="Tell us about your inquiry..."
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                {submitContact.isError && (
                  <p className="text-xs text-destructive">Failed to send message. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="luxury-btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {submitContact.isPending ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-10 h-10 border border-gold flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">Our Address</h3>
                  <p className="text-sm text-muted-foreground">123 Decor Avenue, Design District<br />New York, NY 10001, USA</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 border border-gold flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (800) 555-0199</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 border border-gold flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@signaturehomedecor.com</p>
                  <p className="text-xs text-muted-foreground mt-0.5">We reply within 24–48 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-secondary/40 border border-border">
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">Business Hours</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM EST</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 4:00 PM EST</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
