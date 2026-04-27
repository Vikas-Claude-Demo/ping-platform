import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Transaction = {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  type: 'load' | 'purchase';
};

interface DemoContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  loadMoney: (amountUsd: number) => void;
  makePurchase: (amount: number, merchant: string) => void;
  notification: { title: string; message: string; visible: boolean } | null;
  showNotification: (title: string, message: string) => void;
  hideNotification: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notification, setNotification] = useState<{ title: string; message: string; visible: boolean } | null>(null);

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const loadMoney = (amountUsd: number) => {
    setBalance((prev) => prev + amountUsd);
    addTransaction({
      id: Math.random().toString(),
      merchant: 'Stripe Load',
      amount: amountUsd,
      date: new Date().toISOString(),
      type: 'load',
    });
  };

  const makePurchase = (amount: number, merchant: string) => {
    setBalance((prev) => prev - amount);
    addTransaction({
      id: Math.random().toString(),
      merchant,
      amount: -amount,
      date: new Date().toISOString(),
      type: 'purchase',
    });
  };

  const showNotification = (title: string, message: string) => {
    setNotification({ title, message, visible: true });
    setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 4000);
  };

  const hideNotification = () => {
    setNotification((prev) => (prev ? { ...prev, visible: false } : null));
  };

  return (
    <DemoContext.Provider
      value={{
        balance,
        transactions,
        addTransaction,
        loadMoney,
        makePurchase,
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
