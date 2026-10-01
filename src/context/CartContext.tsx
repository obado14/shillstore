'use client';

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useCallback,
  useMemo,
} from 'react';
import { Product } from '@/types/shill';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('cart-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cart-updated', callback);
  };
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  return localStorage.getItem('shill_cart') || '[]';
}

function getServerSnapshot(): string {
  return '[]';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const cart: CartItem[] = useMemo(() => {
    try {
      const parsed = JSON.parse(cartRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [cartRaw]);

  const saveCart = useCallback((newCart: CartItem[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('shill_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
      } catch {
        // Ignore
      }
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      const addQty = Math.max(1, quantity);
      const existing = cart.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      } else {
        updated = [...cart, { product, quantity: addQty }];
      }
      saveCart(updated);
      setIsCartOpen(true);
    },
    [cart, saveCart]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const updated = cart.filter((item) => item.product.id !== productId);
      saveCart(updated);
    },
    [cart, saveCart]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const updated = cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCart(updated);
    },
    [cart, removeFromCart, saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
