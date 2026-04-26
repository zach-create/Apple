import { AnimatePresence, LayoutGroup, motion, useScroll } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const navLinks = [
  { label: 'Shop', path: '/shop' },
  { label: 'New In', path: '/#organic' },
  { label: 'Collections', path: '/#seasonal' },
  { label: 'Our Story', path: '/#story' },
  { label: 'Blog', path: '/#blog' },
  { label: 'Contact', path: '/#contact' },
];

function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const { itemCount, toggleCart, cartIconRef, cartPulseTick } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 10);
    });
  }, [scrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <>
      <motion.header
        className={`navbar-shell ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="navbar">
          <Link className="logo-link" to="/" aria-label="Apple & Peaches home">
            <Logo compact={scrolled} />
          </Link>

          <LayoutGroup>
            <div className="nav-links desktop-only">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.path} className="nav-link">
                  <motion.span className="nav-link-inner" whileHover={{ color: 'var(--green)' }}>
                    {link.label}
                    {location.pathname === '/shop' && link.label === 'Shop' && (
                      <motion.span className="nav-underline" layoutId="nav-underline" />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>
          </LayoutGroup>

          <div className="nav-actions">
            <button className="icon-button" aria-label="Search">
              <span>⌕</span>
            </button>
            <button className="icon-button" aria-label="Wishlist">
              <span>♡</span>
            </button>
            <motion.button
              ref={cartIconRef}
              className="icon-button"
              aria-label="Open cart"
              onClick={toggleCart}
              animate={cartPulseTick ? { y: [0, -4, 0], scale: [1, 1.08, 1] } : undefined}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <span>🛒</span>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </motion.button>
            <button
              className="mobile-toggle"
              aria-label="Open menu"
              onClick={() => setMobileOpen((current) => !current)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-menu-panel"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.08 },
                },
              }}
            >
              <Logo light />
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link className="mobile-link" to={link.path}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <NavLink className="mobile-link" to="/login">
                  Login
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
