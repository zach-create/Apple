import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  blogPosts,
  collectionCards,
  faqItems,
  featuredProduct,
  homepageCarouselProducts,
  infiniteStripPalettes,
  testimonials,
} from '../data/products';

const spring = { type: 'spring', stiffness: 280, damping: 22 };
const reveal = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] };

function LandingPage() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [activeThumb, setActiveThumb] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const storyY = useTransform(scrollYProgress, [0.18, 0.42], [0, -80]);
  const heroFallbackY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  const carouselWidth = useMemo(
    () => Math.max(0, homepageCarouselProducts.length * 280 - 960),
    [],
  );

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {bannerVisible && (
          <motion.section
            className="newsletter-banner"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={reveal}
          >
            <div>
              <h2>First timer? Sign up and get 20% off your first order</h2>
              <p>
                Subscribe to our newsletter and be the first to hear about new arrivals,
                special promotions, and online exclusives.
              </p>
            </div>
            <div className="newsletter-banner-actions">
              <input type="email" placeholder="Email address" />
              <motion.button
                type="button"
                className="primary-button"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
                transition={spring}
              >
                Subscribe
              </motion.button>
              <button
                type="button"
                className="dismiss-banner"
                onClick={() => setBannerVisible(false)}
              >
                ×
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="hero-section produce-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="https://cdn.coverr.co/videos/coverr-harvested-fruit-1561489161690?download=1080p" type="video/mp4" />
        </video>
        <motion.div className="hero-fallback-gradient" style={{ y: heroFallbackY }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.span
            className="hero-kicker"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal}
          >
            EST. 2022
          </motion.span>
          <motion.div
            className="hero-heading-stack"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {['Style That Stands', 'the Test of Time'].map((line) => (
              <motion.h1
                key={line}
                variants={{
                  hidden: { y: 70, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={reveal}
              >
                {line}
              </motion.h1>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...reveal, delay: 0.35 }}
          >
            We create clothing that transcends trends — a blend of classic tailoring, refined silhouettes, and modern ease.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.5 }}
          >
            <Link className="hero-cta" to="/shop">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-head-row" id="organic">
        <div>
          <span className="section-label">New Collection</span>
          <h2>Signature Wardrobe</h2>
        </div>
        <Link className="section-link" to="/shop">
          See All Products
        </Link>
      </section>

      <section className="carousel-section">
        <motion.div
          ref={carouselRef}
          className="carousel-track"
          drag="x"
          dragConstraints={{ left: -carouselWidth, right: 0 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {homepageCarouselProducts.map((product) => (
            <div className="carousel-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="story-banner-section" id="story">
        <motion.div className="story-banner-image" style={{ y: storyY }} />
        <div className="story-banner-content">
          <h2>Embrace individuality and redefine your wardrobe</h2>
          <Link className="section-link light" to="/login">
            Our Story
          </Link>
        </div>
      </section>

      <section className="image-strip-section">
        <div className="image-strip-track">
          {[...infiniteStripPalettes, ...infiniteStripPalettes].map((palette, index) => (
            <div key={`${palette}-${index}`} className={`strip-image ${palette}`} />
          ))}
        </div>
      </section>

      <section className="seasonal-pick-section" id="seasonal">
        <div className="section-head-row tight">
          <div>
            <span className="section-label">Featured Piece</span>
            <h2>Heirloom Satin Dress</h2>
          </div>
        </div>
        <div className="seasonal-pick-layout">
          <div className="seasonal-gallery">
            <div className={`seasonal-image ${activeThumb === 0 ? 'peach' : activeThumb === 1 ? 'peach-alt' : 'apple'}`}>
              <span>{activeThumb === 0 ? '👗' : activeThumb === 1 ? '✨' : '🧥'}</span>
            </div>
            <div className="seasonal-thumbs">
              {[0, 1, 2].map((thumb) => (
                <button
                  key={thumb}
                  className={`thumb-button ${activeThumb === thumb ? 'active' : ''}`}
                  onClick={() => setActiveThumb(thumb)}
                  type="button"
                />
              ))}
            </div>
          </div>

          <motion.div
            className="seasonal-copy"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reveal}
          >
            <div className="seasonal-price-row">
              <strong>{featuredProduct.originalPrice}</strong>
              <span>{featuredProduct.price}</span>
            </div>
            <div className="seasonal-rating">★★★★★ (12 reviews)</div>
            <div className="seasonal-trust">
              <span>✅ Safe Payment</span>
              <span>🚚 Free Shipping</span>
              <span>📦 Delivery in 2–5 days</span>
            </div>
            <motion.button
              className="primary-button full-width"
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
            >
              Order Now
            </motion.button>
            <p>{featuredProduct.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-heading-center">
          <span className="section-label">What Our Customers Said</span>
          <h2>What Our Customers Said</h2>
        </div>
        <div className="testimonial-marquee-row left">
          <div className="testimonial-marquee-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article className="testimonial-card" key={`${item.author}-${index}`}>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <strong>{item.author}</strong>
              </article>
            ))}
          </div>
        </div>
        <div className="testimonial-marquee-row right">
          <div className="testimonial-marquee-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article className="testimonial-card" key={`${item.author}-row2-${index}`}>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <strong>{item.author}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collection-grid-section" id="essentials">
        <div className="collection-grid">
          {collectionCards.map((card) => (
            <motion.article
              key={card.title}
              className={`collection-grid-card ${card.palette}`}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                className="collection-grid-overlay"
                variants={{
                  rest: { opacity: 0.18 },
                  hover: { opacity: 0.3 },
                }}
              />
              <motion.div
                className="collection-grid-copy"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -4 },
                }}
              >
                <h3>{card.title}</h3>
                <Link to="/shop">See Collections</Link>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="blog-section" id="blog">
        <div className="section-head-row">
          <div>
            <span className="section-label">Latest Blog</span>
            <h2>Latest Blog</h2>
          </div>
          <Link className="section-link" to="/login">
            See All
          </Link>
        </div>
        <motion.div
          className="blog-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="blog-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={reveal}
            >
              <motion.div className={`blog-image ${post.palette}`} whileHover={{ scale: 1.01 }}>
                <motion.span
                  className="blog-read-more"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Read More
                </motion.span>
              </motion.div>
              <div className="blog-copy">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="faq-section">
        <div className="section-heading-center">
          <span className="section-label">FAQ</span>
          <h2>FAQ</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div className="faq-item" key={item.question}>
                <button
                  className="faq-trigger"
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reveal}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <motion.section
        className="trust-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          ['🚚', 'Free Shipping', 'Get free shipping on all orders over $100'],
          ['🔒', 'Secure Checkout', 'We make sure everything is safe for you'],
          ['🔄', 'Money Back Guarantee', 'Not satisfied? Just return it to us'],
        ].map(([icon, title, body]) => (
          <motion.article
            key={title}
            className="trust-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span>{icon}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </motion.article>
        ))}
      </motion.section>
    </motion.main>
  );
}

export default LandingPage;
