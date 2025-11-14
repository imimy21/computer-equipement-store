import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// حالة ابتدائية
const initialState = {
  panier: [],
};

// reducer لإدارة الحالة
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, panier: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.panier.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          panier: state.panier.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          panier: [...state.panier, { ...action.payload, quantity: 1 }],
        };
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        panier: state.panier.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.delta) }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        panier: state.panier.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return { ...state, panier: [] };
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // تحميل السلة من localStorage عند التحميل الأول
  useEffect(() => {
    const savedCart = localStorage.getItem('panier');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // حفظ السلة في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(state.panier));
  }, [state.panier]);

  // الدوال
  const addToPanier = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const updateQuantity = (id, delta) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, delta } });
  };

  const removeFromPanier = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const clearPanier = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.panier.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    panier: state.panier,
    addToPanier,
    updateQuantity,
    removeFromPanier,
    clearPanier,
    total,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook لاستخدام Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};