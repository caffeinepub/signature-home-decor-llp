import React from 'react';
import { Link } from '@tanstack/react-router';
import type { BlogPost } from '../backend';
import { Calendar, User } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const dateStr = new Date(Number(post.date) / 1_000_000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link to="/blog/$id" params={{ id: post.id.toString() }} className="group luxury-card overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img
          src="/assets/generated/collections-feature.dim_1200x600.png"
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-widest uppercase bg-gold text-foreground px-2 py-1 font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-base text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
          <span className="flex items-center gap-1.5">
            <User size={11} />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {dateStr}
          </span>
        </div>
      </div>
    </Link>
  );
}
