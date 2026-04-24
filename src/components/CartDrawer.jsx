import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

function CartDrawer() {
  const { items, closeCart, isCartOpen, updateQuantity, removeItem, subtotal } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            className="cart-backdrop"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <div className="cart-header">
              <div>
                <span className="section-label">Your bag</span>
                <h3>Cart</h3>
              </div>
              <button className="icon-button" onClick={closeCart} aria-label="Close cart">
                ×
              </button>
            </div>
            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <p>Your bag is empty.</p>
                  <span>Add a basket, a seasonal pick, or a gifting bundle to get started.</span>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className={`cart-swatch ${item.palette}`} />
                    <div className="cart-item-copy">
                      <strong>{item.name}</strong>
                      <span>{formatPrice(item.priceValue)}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-link" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </motion.div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <motion.button
                className="primary-button full-width"
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                Checkout
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
