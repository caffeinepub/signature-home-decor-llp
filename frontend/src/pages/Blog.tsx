import React from 'react';
import { useBlogPosts } from '../hooks/useQueries';
import BlogPostCard from '../components/BlogPostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

export default function Blog() {
  const { data: posts, isLoading, isError } = useBlogPosts();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-secondary/40 border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Inspiration & Ideas</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Blog</h1>
          <div className="gold-divider" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4">
            Design tips, home decor inspiration, and lifestyle stories from our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isError && (
          <div className="text-center py-20">
            <p className="text-destructive text-sm">Failed to load blog posts. Please try again.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="luxury-card overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isError && (!posts || posts.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen size={40} className="text-muted-foreground mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">No posts yet</h3>
            <p className="text-muted-foreground text-sm">Check back soon for design inspiration and home decor tips.</p>
          </div>
        )}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {posts.map((post) => (
              <BlogPostCard key={Number(post.id)} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
