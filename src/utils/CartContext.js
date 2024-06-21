// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { makeApi } from '../api/callApi.tsx';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
      setCartItemCount(0);
      return;
    }

    setIsLogin(true);

    try {
      const response = await makeApi("/api/my-cart", "GET");
      setCartItemCount(response.data.orderItems.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [isLogin]);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount, fetchCartItems, isLogin, setIsLogin }}>
      {children}
    </CartContext.Provider>
  );
};
