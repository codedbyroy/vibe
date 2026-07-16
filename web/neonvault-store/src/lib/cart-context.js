'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'neonvault-cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.items, initialized: true };

    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id);
      let newItems;
      if (existing) {
        newItems = state.items.map(i =>
          i.id === action.product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, action.product.stockQuantity) }
            : i
        );
      } else {
        newItems = [...state.items, {
          id: action.product.id,
          slug: action.product.slug,
          name: action.product.name,
          price: action.product.price,
          compareAtPrice: action.product.compareAtPrice,
          image: action.product.images[0],
          quantity: 1,
          stockQuantity: action.product.stockQuantity,
        }];
      }
      return { ...state, items: newItems };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, Math.min(action.quantity, i.stockQuantity)) }
            : i
        ),
      };

    case 'CLEAR':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], initialized: false });

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: 'INIT', items: JSON.parse(saved) });
      } else {
        dispatch({ type: 'INIT', items: [] });
      }
    } catch {
      dispatch({ type: 'INIT', items: [] });
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (state.initialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.initialized]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
