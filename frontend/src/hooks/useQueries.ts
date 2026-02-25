import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Order, ContactSubmission, BlogPost } from '../backend';

export function useProducts(category?: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', category ?? 'all'],
    queryFn: async () => {
      if (!actor) return [];
      if (category && category !== 'All') {
        return actor.getProductsByCategory(category);
      }
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}
