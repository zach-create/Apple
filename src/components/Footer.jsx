import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="site-footer">
      <AnnouncementBar footer />
      <div className="footer-main">
        <div className="footer-column">
          <Logo />
          <p>Clothing that stands the test of time.</p>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/#organic">New In</Link>
          <Link to="/#seasonal">Collections</Link>
          <Link to="/#essentials">Essentials</Link>
        </div>
        <div className="footer-column">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/#story">Our Story</Link>
          <Link to="/#blog">Blog</Link>
          <Link to="/#contact">Contact</Link>
          <Link to="/login">Privacy Policy</Link>
        </div>
        <div className="footer-column">
          <h4>Social</h4>
          <a href="/">Instagram</a>
          <a href="/">TikTok</a>
          <a href="/">YouTube</a>
          <a href="/">Facebook</a>
          <motion.form className="footer-subscribe" whileFocus={{ scale: 1.01 }}>
            <input type="email" placeholder="Email address" />
            <button type="button" className="secondary-button">
              Subscribe
            </button>
          </motion.form>
        </div>
      </div>
      <div className="footer-bottom">Copyright 2025, Apple &amp; Peaches · Designed by Prashant Dongare</div>
    </footer>
  );
}

export default Footer;
