import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { shopProducts } from '../data/products';

function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const product = shopProducts.find((item) => item.id === id) || shopProducts[0];

  return (
    <motion.main
      className="page product-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="product-page-layout">
        <div
          className={`product-page-image ${product.imageSrc ? 'product-photo-frame' : product.palette}`}
          style={product.imageSrc ? { backgroundImage: `url(${product.imageSrc})` } : undefined}
        >
          <span>{product.name}</span>
        </div>
        <div className="product-page-copy">
          <span className="section-label">{product.collection}</span>
          <h1>{product.name}</h1>
          <div className="product-card-pricing">
            <span className="current">{formatPrice(product.priceValue)}</span>
            <span className="old">{formatPrice(product.originalPriceValue ?? product.priceValue)}</span>
          </div>
          <p>
            A premium Apple &amp; Peaches garment designed for polished everyday wear,
            occasion dressing, and a wardrobe that feels timeless instead of seasonal.
          </p>
          <div className="seasonal-trust">
            <span>✅ Safe Payment</span>
            <span>🚚 Free Shipping</span>
            <span>📦 Delivery in 2–5 days</span>
          </div>
          <motion.button
            className="primary-button"
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onClick={(event) => addItem(product, event.currentTarget.getBoundingClientRect())}
          >
            Add to Bag
          </motion.button>
        </div>
      </div>
    </motion.main>
  );
}

export default ProductPage;
