import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    body: string;
    date: Time;
    author: string;
    excerpt: string;
    category: string;
}
export type Time = bigint;
export interface Order {
    id: bigint;
    status: string;
    createdAt: Time;
    guestName: string;
    productId: bigint;
    guestEmail: string;
    quantity: bigint;
    shippingAddress: string;
    totalPrice: number;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    createdAt: Time;
    email: string;
    message: string;
}
export interface backendInterface {
    addBlogPost(title: string, excerpt: string, body: string, author: string, category: string): Promise<bigint>;
    addProduct(name: string, description: string, category: string, price: number, imageUrl: string): Promise<bigint>;
    applyCouponCode(total: number, couponCode: string): Promise<number>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getOrderById(id: bigint): Promise<Order | null>;
    getOrders(): Promise<Array<Order>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    initializeSampleContent(): Promise<void>;
    placeOrder(guestName: string, guestEmail: string, shippingAddress: string, productId: bigint, quantity: bigint, totalPrice: number): Promise<bigint>;
    resetData(): Promise<void>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<bigint>;
}
