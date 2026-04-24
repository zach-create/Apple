import { createContext, useContext, useMemo, useReducer, useRef } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],
  isCartOpen: false,
  flyingDots: [],
  cartPulseTick: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.product.id);
      const nextItems = existing
        ? state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.items, { ...action.product, quantity: 1 }];

      return {
        ...state,
        items: nextItems,
        cartPulseTick: state.cartPulseTick + 1,
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: Math.max(0, item.quantity + action.delta) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case 'OPEN_CART':
      return { ...state, isCartOpen: true };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'ADD_FLYING_DOT':
      return {
        ...state,
        flyingDots: [...state.flyingDots, action.dot],
      };
    case 'DISMISS_FLYING_DOT':
      return {
        ...state,
        flyingDots: state.flyingDots.filter((dot) => dot.id !== action.id),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cartIconRef = useRef(null);

  const addItem = (product, sourceRect) => {
    dispatch({ type: 'ADD_ITEM', product });

    if (sourceRect && cartIconRef.current) {
      const cartRect = cartIconRef.current.getBoundingClientRect();
      dispatch({
        type: 'ADD_FLYING_DOT',
        dot: {
          id: `${product.id}-${Date.now()}-${Math.random()}`,
          startX: sourceRect.left + sourceRect.width / 2,
          startY: sourceRect.top + sourceRect.height / 2,
          endX: cartRect.left + cartRect.width / 2,
          endY: cartRect.top + cartRect.height / 2,
        },
      });
    }
  };

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0,
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items: state.items,
      isCartOpen: state.isCartOpen,
      flyingDots: state.flyingDots,
      cartPulseTick: state.cartPulseTick,
      itemCount,
      subtotal,
      cartIconRef,
      addItem,
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQuantity: (id, delta) => dispatch({ type: 'UPDATE_QUANTITY', id, delta }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      dismissFlyingDot: (id) => dispatch({ type: 'DISMISS_FLYING_DOT', id }),
    }),
    [state, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
