"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  size: string;
  quantity: number;
}

interface CartStore {
  // Cart items
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;

  // Drawer state (NOT persisted — drawer is always closed on fresh load)
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // Cart items
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      total: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      // Drawer state
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "nocaps-cart",
      // Only persist items, not the drawer open state
      partialize: (state) => ({ items: state.items }),
    }
  )
);