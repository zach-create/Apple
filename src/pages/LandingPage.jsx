import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../first.mp4';
import storyVideo from '../../second.mp4';
import limitedVideo from '../../limited.mp4';
import blogImageOne from '../../Blog1.jpg';
import blogImageTwo from '../../Blog2.jpg';
import blogImageThree from '../../Blog3.jpg';
import ProductCard from '../components/ProductCard';
import {
  blogPosts,
  collectionCards,
  faqItems,
  featuredProduct,
  homepageCarouselProducts,
  testimonials,
} from '../data/products';

const spring = { type: 'spring', stiffness: 280, damping: 22 };
const reveal = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] };
const blogImages = [blogImageOne, blogImageTwo, blogImageThree];
const tailoredCollectionImages = Object.values(
  import.meta.glob('../../Designs/B_DES/*', { eager: true, import: 'default' }),
).sort();
const occasionCollectionImages = Object.values(
  import.meta.glob('../../Designs/W_DES/*', { eager: true, import: 'default' }),
).sort();
const essentialsCollectionImages = Object.values(
  import.meta.glob('../../Designs/Same/*', { eager: true, import: 'default' }),
).sort();

function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const carouselRef = useRef(null);
  const signatureDropProducts = useMemo(() => homepageCarouselProducts.slice(0, 5), []);
  const collectionImageSets = [
    tailoredCollectionImages,
    occasionCollectionImages,
    essentialsCollectionImages,
  ];

  const carouselWidth = useMemo(
    () => Math.max(0, signatureDropProducts.length * 280 - 960),
    [],
  );

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="hero-section produce-hero full-bleed-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-fallback-gradient" />
        <div className="hero-overlay" />
        <motion.div className="hero-content">
          <motion.span
            className="hero-kicker"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal}
          >
            EST. 2026
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
        </motion.div>
      </section>

      <section className="section-head-row" id="organic">
        <div>
          <span className="section-label">Limited Collection</span>
          <h2>Signature Drop</h2>
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
          {signatureDropProducts.map((product) => (
            <div className="carousel-card" key={product.id}>
              <ProductCard
                product={product}
                showPricing={false}
                showAction={false}
              />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="story-banner-section" id="story">
        <div className="story-banner-image">
          <video
            className="story-banner-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={storyVideo} type="video/mp4" />
          </video>
        </div>
        <div className="story-banner-content">
          <h2>Embrace individuality and redefine your wardrobe</h2>
          <Link className="section-link light" to="/login">
            Our Story
          </Link>
        </div>
      </section>

      <section className="seasonal-pick-section" id="seasonal">
        <div className="section-head-row tight">
          <div>
            <span className="section-label">On Order</span>
            <h2>Limited Signature Drop</h2>
          </div>
        </div>
        <div className="seasonal-pick-layout">
          <div className="seasonal-gallery">
            <video
              className="seasonal-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={limitedVideo} type="video/mp4" />
            </video>
          </div>

          <motion.div
            className="seasonal-copy"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reveal}
          >
            <h3 className="seasonal-product-title">Apple and Peaches Brooch</h3>
            <div className="seasonal-price-row">
              <span>INR 650</span>
            </div>
            <div className="seasonal-rating">★★★★★ (499+)</div>
            <motion.button
              className="primary-button full-width"
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
            >
              Place an Order
            </motion.button>
            <p>{featuredProduct.description}</p>
            <p className="seasonal-dispatch-note">
              Each and every clothing is hand woven and hand stitched, so it may take 3 to 4 days to dispatch.
            </p>
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
          {collectionCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="collection-grid-card"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <div className="collection-card-slider">
                {collectionImageSets[index].map((image, imageIndex) => (
                  <div
                    key={`${card.title}-${imageIndex}`}
                    className="collection-card-slide"
                    data-slide-count={collectionImageSets[index].length}
                    style={{
                      backgroundImage: `url(${image})`,
                      animationDelay: `${imageIndex * 3}s`,
                      animationDuration: `${collectionImageSets[index].length * 3}s`,
                    }}
                  />
                ))}
              </div>
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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={reveal}
            >
              <motion.div
                className="blog-image blog-photo"
                style={{ backgroundImage: `url(${blogImages[index]})` }}
                whileHover={{ scale: 1.01 }}
              >
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

    </motion.main>
  );
}

export default LandingPage;
