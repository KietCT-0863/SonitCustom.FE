import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.prodId === product.prodId);
      if (existingItem) {
        return prevItems.map(item =>
          item.prodId === product.prodId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (prodId) => {
    setCartItems(prevItems => prevItems.filter(item => item.prodId !== prodId));
  };

  const updateQuantity = (prodId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.prodId === prodId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotalItems,
        getCartTotalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 