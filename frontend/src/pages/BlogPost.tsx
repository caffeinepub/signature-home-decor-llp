import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useBlogPosts } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams({ from: '/blog/$id' });
  const { data: posts, isLoading } = useBlogPosts();

  const post = posts?.find(p => p.id.toString() === id);
  const dateStr = post
    ? new Date(Number(post.date) / 1_000_000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-8 rounded-none" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Post Not Found</h2>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="luxury-btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero image */}
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <img
          src="/assets/generated/collections-feature.dim_1200x600.png"
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
            <span className="inline-block text-[10px] tracking-widest uppercase bg-gold text-foreground px-3 py-1 font-medium mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-background leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors mb-8 uppercase tracking-widest"
        >
          <ArrowLeft size={12} />
          Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {dateStr}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag size={12} />
            {post.category}
          </span>
        </div>

        {/* Excerpt */}
        <p className="font-display text-lg italic text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Body */}
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {post.body.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('# ')) {
              return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.slice(2)}</h2>;
            }
            if (paragraph.startsWith('## ')) {
              return <h3 key={i} className="font-display text-xl font-bold text-foreground mt-6 mb-3">{paragraph.slice(3)}</h3>;
            }
            if (paragraph.trim() === '') return null;
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-4">Inspired? Explore our curated collections.</p>
          <Link to="/shop" className="luxury-btn-gold inline-block">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}
