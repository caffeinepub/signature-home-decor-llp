import React, { useState } from 'react';
import { useProducts, useOrders, useContactSubmissions, useBlogPosts } from '../hooks/useQueries';
import { useAddProduct, useAddBlogPost } from '../hooks/useMutations';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Package,
  ShoppingBag,
  MessageSquare,
  BookOpen,
  Plus,
  Loader2,
  X,
  LayoutDashboard,
} from 'lucide-react';

type Tab = 'overview' | 'products' | 'orders' | 'contacts' | 'blog';

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="luxury-card p-6 flex items-center gap-4">
      <div className="w-12 h-12 border border-gold flex items-center justify-center shrink-0">
        <Icon size={20} className="text-gold" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

function AddProductForm({ onClose }: { onClose: () => void }) {
  const addProduct = useAddProduct();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Living Room',
    price: '',
    imageUrl: '',
  });

  const categories = ['Living Room', 'Bedroom', 'Kitchen', 'Outdoor', 'Office', 'Dining Room', 'Garden'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    await addProduct.mutateAsync({
      name: form.name,
      description: form.description,
      category: form.category,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg border border-border shadow-luxury-deep">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-display font-bold text-lg text-foreground">Add New Product</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
                className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              placeholder="https://..."
            />
          </div>
          {addProduct.isError && (
            <p className="text-xs text-destructive">Failed to add product. Please try again.</p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={addProduct.isPending}
              className="luxury-btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              {addProduct.isPending ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Saving…
                </>
              ) : (
                'Add Product'
              )}
            </button>
            <button type="button" onClick={onClose} className="luxury-btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddBlogPostForm({ onClose }: { onClose: () => void }) {
  const addBlogPost = useAddBlogPost();
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    body: '',
    author: '',
    category: 'Living Room',
  });
  const categories = ['Living Room', 'Bedroom', 'Kitchen', 'Outdoor', 'Office', 'Dining Room', 'Garden'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) return;
    await addBlogPost.mutateAsync(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg border border-border shadow-luxury-deep max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-display font-bold text-lg text-foreground">Add New Blog Post</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
              Body
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                Author *
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                required
                className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {addBlogPost.isError && (
            <p className="text-xs text-destructive">Failed to add post. Please try again.</p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={addBlogPost.isPending}
              className="luxury-btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              {addBlogPost.isPending ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Saving…
                </>
              ) : (
                'Add Post'
              )}
            </button>
            <button type="button" onClick={onClose} className="luxury-btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBlogPost, setShowAddBlogPost] = useState(false);

  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { data: contacts, isLoading: loadingContacts } = useContactSubmissions();
  const { data: blogPosts, isLoading: loadingBlog } = useBlogPosts();

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium mb-2">Management</p>
          <h1 className="font-display text-3xl font-bold text-background">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-border">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-medium tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                activeTab === id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Products" value={products?.length ?? 0} icon={Package} />
            <StatCard label="Total Orders" value={orders?.length ?? 0} icon={ShoppingBag} />
            <StatCard label="Contact Messages" value={contacts?.length ?? 0} icon={MessageSquare} />
            <StatCard label="Blog Posts" value={blogPosts?.length ?? 0} icon={BookOpen} />
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                Products ({products?.length ?? 0})
              </h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="luxury-btn-gold flex items-center gap-2"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
            {loadingProducts ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (
              <div className="luxury-card overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                        Category
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products?.map((p) => (
                      <tr key={Number(p.id)} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                        <td className="px-4 py-3 text-foreground">${p.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              Orders ({orders?.length ?? 0})
            </h2>
            {loadingOrders ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="luxury-card overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        ID
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Customer
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden md:table-cell">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Total
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((o) => (
                      <tr key={Number(o.id)} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">#{o.id.toString()}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{o.guestName}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{o.guestEmail}</td>
                        <td className="px-4 py-3 text-foreground">${o.totalPrice.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] tracking-widest uppercase bg-gold/10 text-gold px-2 py-1 font-medium">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <ShoppingBag size={36} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No orders yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Contacts */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              Contact Submissions ({contacts?.length ?? 0})
            </h2>
            {loadingContacts ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : contacts && contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={Number(c.id)} className="luxury-card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-display font-semibold text-sm text-foreground">{c.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{c.email}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(Number(c.createdAt) / 1_000_000).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gold uppercase tracking-wide mb-1">{c.subject}</p>
                    <p className="text-sm text-muted-foreground">{c.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <MessageSquare size={36} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No contact submissions yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Blog Posts */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                Blog Posts ({blogPosts?.length ?? 0})
              </h2>
              <button
                onClick={() => setShowAddBlogPost(true)}
                className="luxury-btn-gold flex items-center gap-2"
              >
                <Plus size={14} /> Add Post
              </button>
            </div>
            {loadingBlog ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : blogPosts && blogPosts.length > 0 ? (
              <div className="luxury-card overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Title
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                        Author
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                        Category
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {blogPosts.map((p) => (
                      <tr key={Number(p.id)} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground line-clamp-1">{p.title}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.author}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(Number(p.date) / 1_000_000).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen size={36} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No blog posts yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}
      {showAddBlogPost && <AddBlogPostForm onClose={() => setShowAddBlogPost(false)} />}
    </div>
  );
}
