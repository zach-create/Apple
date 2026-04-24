import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import MotionDotLayer from './components/MotionDotLayer';
import PageCurtain from './components/PageCurtain';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.querySelector(location.hash);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="site-shell">
      <PageCurtain />
      <AnnouncementBar />
      <Navbar />
      <MotionDotLayer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/login' && <Footer />}
      <CartDrawer />
    </div>
  );
}

export default App;
