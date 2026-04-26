import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCurrency } from '../context/CurrencyContext';
import { shopCategories, shopProducts } from '../data/products';

const spring = { type: 'spring', stiffness: 280, damping: 22 };

function ShopPage() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [category, setCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filteredProducts = useMemo(() => {
    if (category === 'All') return shopProducts;
    return shopProducts.filter((product) => product.category === category);
  }, [category]);

  const handleOpenProduct = (product) => {
    if (isMobile) {
      setSelectedProduct(product);
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.main
      className="page shop-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <section className="shop-title-block">
        <span className="section-label">Shop</span>
        <h1>All Products</h1>
      </section>

      <motion.div className="filter-pill-row" layout>
        {shopCategories.map((item) => (
          <motion.button
            key={item}
            className={`filter-pill ${category === item ? 'active' : ''}`}
            onClick={() => setCategory(item)}
            whileTap={{ scale: 0.95 }}
            layout
            transition={spring}
          >
            {item}
          </motion.button>
        ))}
      </motion.div>

      <motion.section className="shop-grid" layout>
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={product} onOpen={() => handleOpenProduct(product)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.button
              className="product-drawer-backdrop"
              aria-label="Close product drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            />
            <motion.aside
              className="product-detail-drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={spring}
            >
              <div
                className={`product-detail-image ${selectedProduct.imageSrc ? 'product-photo-frame' : selectedProduct.palette}`}
                style={
                  selectedProduct.gallery?.[selectedImageIndex]
                    ? { backgroundImage: `url(${selectedProduct.gallery[selectedImageIndex]})` }
                    : selectedProduct.imageSrc
                      ? { backgroundImage: `url(${selectedProduct.imageSrc})` }
                      : undefined
                }
              >
                <span>{selectedProduct.name}</span>
              </div>
              <div className="product-detail-copy">
                <span className="section-label">{selectedProduct.collection}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="product-card-pricing">
                  <span className="current">{formatPrice(selectedProduct.priceValue)}</span>
                  <span className="old">{formatPrice(selectedProduct.originalPriceValue ?? selectedProduct.priceValue)}</span>
                </div>
                <p>
                  A refined wardrobe piece designed for elegant everyday dressing, thoughtful layering,
                  and a polished finish from day to night.
                </p>
                <button
                  type="button"
                  className="primary-button full-width"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default ShopPage;
