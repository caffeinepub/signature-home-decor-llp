# Specification

## Summary
**Goal:** Perform a full-site rebuild of Signature Home Decor LLP with a complete Motoko backend, all frontend pages, and an admin dashboard.

**Planned changes:**
- Update the Motoko backend actor to store 15 products across 7 categories (Living Room, Bedroom, Kitchen, Outdoor, Office, Dining Room, Garden) with fields id, name, description, category, price, and imageUrl (Unsplash URLs); add order storage via `placeOrder`; contact form submission storage via `submitContact`; and 4 pre-populated blog posts with title, excerpt, body, author, date, and category; expose query functions for all entities
- Build a fully navigable React frontend with React Router covering routes: `/`, `/shop`, `/product/:id`, `/cart`, `/wishlist`, `/checkout`, `/about`, `/contact`, `/admin`, `/blog`, `/blog/:id`; apply luxury ivory/beige/matte black/champagne gold theme with Playfair Display serif headings throughout
- Build the Home page with a cinematic full-width hero, Featured Categories section (7 categories), Best Sellers section (4 products), and a Testimonials section
- Build the Shop page with category filter tabs, price range filter, sort options, and a real-time search bar; fetch products from backend via React Query
- Build the Product Detail page with product image, name, description, price, category tag, Add to Cart, Add to Wishlist, Shipping & Return accordion, and Related Products (up to 4 from same category)
- Implement persistent Cart and Wishlist via React Context; Cart page with quantity controls and subtotal; Wishlist page with Move to Cart option
- Build the Checkout page with guest form (name, email, shipping address), coupon code input, order summary panel, and Place Order button that calls backend and shows confirmation
- Build the About Us page with brand story, Vision & Mission section, and luxury editorial layout
- Build the Contact page with a form that submits to the backend, plus a floating WhatsApp button with pre-filled message visible on all pages
- Build the Admin Dashboard at `/admin` (no authentication) with four tabs: Products (add/edit/delete), Orders (view all), Contact Submissions (view all), Blog Posts (add/edit/delete); all data read from and written to the Motoko backend
- Build the Blog listing page at `/blog` with post cards in a grid, and individual post pages at `/blog/:id` with full post content; data fetched from backend

**User-visible outcome:** Users can browse a fully themed luxury home decor store, shop and filter 15 products, manage a cart and wishlist, checkout as a guest, read blog posts, contact the store, and chat via WhatsApp. An admin dashboard allows managing products, orders, contacts, and blog posts without login.
