import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      guestName: string;
      guestEmail: string;
      shippingAddress: string;
      productId: bigint;
      quantity: bigint;
      totalPrice: number;
    }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.placeOrder(
        params.guestName,
        params.guestEmail,
        params.shippingAddress,
        params.productId,
        params.quantity,
        params.totalPrice
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useApplyCoupon() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: { total: number; couponCode: string }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.applyCouponCode(params.total, params.couponCode);
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string; email: string; subject: string; message: string }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.submitContact(params.name, params.email, params.subject, params.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      description: string;
      category: string;
      price: number;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.addProduct(params.name, params.description, params.category, params.price, params.imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useAddBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      excerpt: string;
      body: string;
      author: string;
      category: string;
    }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.addBlogPost(params.title, params.excerpt, params.body, params.author, params.category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

export function useInitializeSampleContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.initializeSampleContent();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}
