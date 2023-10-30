"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Walletの型定義
export interface WalletData {
  address: string;
}

const initialWalletData: WalletData = {
  address: "",
};

// データコンテキストを作成
interface WalletContextType {
  walletData: WalletData | null;
  setWalletData: (data: WalletData | null) => void;
}
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// データプロバイダーコンポーネントを作成
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<WalletData | null>(initialWalletData); // 初期データを設定

  const contextValue: WalletContextType = {
    walletData,
    setWalletData,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// データを使用するためのカスタムフック
export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
