import React, { useEffect } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import { useInitializeSampleContent } from './hooks/useMutations';
import { useActor } from './hooks/useActor';

function AppInitializer() {
  const { actor, isFetching } = useActor();
  const { mutate: initContent } = useInitializeSampleContent();

  useEffect(() => {
    if (actor && !isFetching) {
      initContent();
    }
  }, [actor, isFetching, initContent]);

  return null;
}

function Layout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <AppInitializer />
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const shopRoute = createRoute({ getParentRoute: () => rootRoute, path: '/shop', component: Shop });
const productRoute = createRoute({ getParentRoute: () => rootRoute, path: '/product/$id', component: ProductDetail });
const cartRoute = createRoute({ getParentRoute: () => rootRoute, path: '/cart', component: Cart });
const wishlistRoute = createRoute({ getParentRoute: () => rootRoute, path: '/wishlist', component: Wishlist });
const checkoutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/checkout', component: Checkout });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: About });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const blogRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blog', component: Blog });
const blogPostRoute = createRoute({ getParentRoute: () => rootRoute, path: '/blog/$id', component: BlogPost });
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: Admin });

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  cartRoute,
  wishlistRoute,
  checkoutRoute,
  aboutRoute,
  contactRoute,
  blogRoute,
  blogPostRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
