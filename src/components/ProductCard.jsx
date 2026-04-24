import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const emojiMap = {
  apple: '🧥',
  'apple-alt': '🪡',
  peach: '👗',
  'peach-alt': '✨',
  citrus: '👚',
  'citrus-alt': '🕊',
  berry: '🧵',
  'berry-alt': '🖤',
  tropical: '🧶',
  'tropical-alt': '☼',
  greens: '🧥',
  'greens-alt': '✦',
};

function ProductCard({
  product,
  actionLabel = 'Add to Bag',
  onOpen,
  showPricing = true,
  showAction = true,
  imageSrc,
}) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [hovered, setHovered] = useState(false);

  const handleAdd = (event) => {
    event.stopPropagation();
    addItem(product, event.currentTarget.getBoundingClientRect());
  };

  return (
    <motion.article
      className="product-card"
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
    >
      <div className="product-card-image-shell">
        {imageSrc ? (
          <div
            className="product-card-photo"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={hovered ? product.hoverPalette : product.palette}
              className={`product-card-image ${hovered ? product.hoverPalette : product.palette}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span>{emojiMap[hovered ? product.hoverPalette : product.palette]}</span>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="product-card-copy">
        <span className="product-card-tag">{product.collection}</span>
        <h3>{product.name}</h3>
        {showPricing ? (
          <div className="product-card-pricing">
            <span className="current">{formatPrice(product.priceValue)}</span>
            <span className="old">{formatPrice(product.originalPriceValue ?? product.priceValue)}</span>
          </div>
        ) : (
          <div className="product-card-status">Dropping Soon</div>
        )}
      </div>
      {showAction && (
        <motion.button
          className="secondary-button product-card-button"
          whileHover={{ scale: 0.97, backgroundColor: 'var(--green)', color: 'var(--white)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          onClick={handleAdd}
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.article>
  );
}

export default ProductCard;
