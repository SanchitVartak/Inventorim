import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  expiryDate?: string;
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  consumeItem: (id: string, quantity?: number) => void;
  clearInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const stored = localStorage.getItem('inventory');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const consumeItem = (id: string, quantity?: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = quantity !== undefined ? item.quantity - quantity : item.quantity - 1;
          if (newQuantity <= 0) {
            return null; // Mark for removal
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as InventoryItem[]
    );
  };

  const clearInventory = () => {
    setItems([]);
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, removeItem, updateItem, consumeItem, clearInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
}